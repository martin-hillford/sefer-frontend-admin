import { Profile } from 'types/data/settings/Profile';
import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';
import { useLanguage } from 'sefer/hooks';

export const usePostProfile = () => {
  const post = usePost();
  const language = useLanguage();
  return async (profile: Profile) => {
    const payload = { ...profile, language };
    const { code } = await post('/admin/profile-info', payload);
    switch (code) {
      case 400:
      case 403:
      case 200:
      case 202:
        return code;
      default:
        throw new ResponseError(code, 'Could not save the admin profile.');
    }
  };
}
