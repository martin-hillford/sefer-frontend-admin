import { ResponseError } from 'util/errors';
import { useGetAsync } from 'sefer-fetch';

export const useFetchTwoFactorAuthEnabled = () => {
  const get = useGetAsync<{enabled: boolean}>();
  return async () => {
    const { code, body } = await get('/account/two-factor-authentication/is-enabled');
    if (code !== 200) throw new ResponseError(code, 'Could not fetch the status of two-factor-authentication for this user.');
    return body?.enabled === true;
  };
}
