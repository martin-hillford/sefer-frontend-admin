import { useAdminFrontendConfig } from 'hooks/useAdminFrontendConfig';
import { DataContext } from 'sefer/types/DataContext';
import { Validator } from 'sefer/util/validator/Validator';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useEffect, useState } from 'react';
import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';
import { useLanguage } from 'sefer/hooks';

type Password = { old : string; new : string; confirm : string; }
const init = { old: '', new: '', confirm: '', };

export const usePassword = () : [ DataContext<Password> | undefined, () => Promise<number | undefined> ] => {
  const terms = useLocalization(localization);
  const language = useLanguage();
  const [context, setContext] = useDataContext(init);
  const config = useAdminFrontendConfig();
  const post = usePostPassword();

  const save = async () => {
    if (!context || !config) return undefined;

    const { old, confirm } = context.data;
    const code = await post(language, old, context.data.new, confirm);

    switch (code) {
      case 403:
        context.setError('old', terms.savedFailed);
        setContext(context);
        break;
      case 202:
        context.set(init);
        break;
    }

    return code;
  };

  return [context, save];
};

const useDataContext = (password: Password) => {
  const dataContext = useCreateContext(password);
  const state = useState<DataContext<Password>>(dataContext);

  useEffect(() => {
    if (!password) state[1](password);
    else state[1](dataContext);
  }, [password]);


  if (state[0]) state[0].setListener(state[1]);
  return state;
}

const useCreateContext = (password : Password) => {
  const terms = useLocalization(localization);
  if(!password) return password;

  const validator = new Validator();
  validator
    .prop('old')
    .string()
    .required(terms.passwordRequired);

  validator
    .prop('new')
    .string()
    .required(terms.newPasswordRequired)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, terms.newPasswordPattern);

  validator
    .prop('confirm')
    .string()
    .required(terms.confirmationRequired)
    .custom(async (_ : string, item : Password) => item.new === item.confirm, terms.confirmationMatch);

  const context = new DataContext(password);
  context.setValidator(validator);
  return context;
};


const usePostPassword = () => {
  const post = usePost();
  return async (language: string, oldPassword: string, newPassword: string, confirmNewPassword: string) => {
    const payload = { language, oldPassword, password: newPassword, confirmNewPassword };
    const { code } = await post('/user/update-password', payload);

    switch (code) {
      case 202:
      case 403:
        return code;
      default: throw new ResponseError(code, 'Could not save the admin password.');
    }
  };
}
