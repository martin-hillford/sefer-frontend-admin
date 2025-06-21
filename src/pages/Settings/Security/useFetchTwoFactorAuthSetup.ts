import { ResponseError } from 'util/errors';
import { TwoFactorAuthSetup } from 'types/data/settings/TwoFactorAuthSetup';
import { useGetAsync } from 'sefer-fetch';

export const useFetchTwoFactorAuthSetup = () => {
  const get = useGetAsync<TwoFactorAuthSetup>();
  return async () => {
    const { code, body } = await get('/account/two-factor-authentication/init-setup');
    if (code !== 200) throw new ResponseError(code, 'Could not fetch the setup init of two-factor-authentication for this user.');
    return body!;
  };
}
