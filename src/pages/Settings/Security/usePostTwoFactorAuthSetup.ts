import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';
import { useLanguage } from 'sefer/hooks';

export const usePostTwoFactorAuthSetup = () => {
  const post = usePost<{ keys: string[] }>();
  const language = useLanguage();
  return async (args: string) => {
    const { code, body } = await post('/account/two-factor-authentication/complete-setup', { language, code: args });
    switch (code) {
      case 200: return body!.keys;
      case 403: return null;
      default:
        throw new ResponseError(code, 'Could not setup the two-factor-authentication for this user.');
    }
  };
}
