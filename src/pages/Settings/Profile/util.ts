import { Profile } from 'types/data/settings/Profile';
import { DataContext } from 'sefer/types/DataContext';
import { Validator } from 'sefer/util/validator/Validator';
import { useGet, usePost } from 'sefer-fetch';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useEffect, useState } from 'react';
import { usePostProfile } from './usePostProfile';
import { ResponseError } from 'util/errors';

export const useProfile = () => {
  const profile = useGet<Profile>('/admin/profile-info');
  const [context, setContext] = useDataContext(profile);
  const postProfile = usePostProfile();
  const terms = useLocalization(localization);

  context?.setListener(setContext);

  const save = async () => {
    if (!context || !profile) return { valid: false, code: undefined };
    const code = await postProfile(context.data);

    switch (code) {
      case 200: return { valid: true, code };
      case 403:
        context.setError('password', terms.password);
        setContext(context);
        return { valid: false, code };
      case 202:
        const updated = { ...profile, email: context.data.email };
        context.set(updated);
        return { valid: false, code };
      default: return { valid: false, code };
    }
  };

  return { context, save };
};

const useDataContext = (profile : Profile | null | undefined) => {
  const dataContext = useCreateContext(profile);
  const state = useState<DataContext<Profile> | null | undefined>(dataContext);

  useEffect(() => {
    if (!profile) state[1](profile);
    else state[1](dataContext);
  }, [profile]);


  if (state[0]) state[0].setListener(state[1]);
  return state;
}

const useCreateContext = (profile : Profile | null | undefined) => {
  const terms = useLocalization(localization);
  const postIsEmailUnique = useIsEmailUnique();
  if (!profile) return profile

  const data = { ...profile, emailConfirm: profile.email, password: null } as Profile;
  const isEmailUnique = async (value : string) => {
    if (value === profile.email) return true;
    return postIsEmailUnique(value);
  };

  const validator = new Validator();
  validator
    .prop('name')
    .string()
    .required(terms.nameRequired)
    .minLength(3, terms.nameMinLength)
    .maxLength(255, terms.nameMaxLength);

  validator
    .prop('email')
    .string()
    .required(terms.mailRequired)
    .mail(terms.mailInValid)
    .custom(isEmailUnique, terms.isEmailUnique);

  validator
    .prop('emailConfirm')
    .string()
    .custom(async (_ : string, item : Profile) => item.email === item.emailConfirm, terms.emailConfirmError);

  validator
    .prop('yearOfBirth')
    .number()
    .required(terms.yearOfBirthRequired)
    .range(1900, 2022, terms.yearOfBirthRange);

  validator
    .prop('password')
    .string()
    .required(terms.passwordRequired);

  const context = new DataContext(data);
  context.setValidator(validator);
  return context;
};

const useIsEmailUnique = () => {
  const post = usePost<{ response: boolean }>();
  return async (email : string) => {
    const { code, body } = await post('/public/user/registrations/email', { email });
    if (code !== 200) throw new ResponseError(code, 'Could not fetch email uniqueness information');
    return body?.response === true;
  };
}
