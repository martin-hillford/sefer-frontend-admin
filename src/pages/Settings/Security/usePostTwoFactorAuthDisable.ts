import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';
import { useLanguage } from 'sefer/hooks';

export const usePostTwoFactorAuthDisable = () => {
  const post = usePost();
  const language = useLanguage();
  return async (args: string) => {
    const { code } = await post('/account/two-factor-authentication/disable', { language, code: args });
    switch (code) {
      case 200: return true;
      case 401: return false;
      default:
        throw new ResponseError(code, 'Could not setup the two-factor-authentication for this user.');
    }
  };
}
