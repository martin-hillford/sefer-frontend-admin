 
import { usePost } from 'sefer-fetch';
import LogonResult from 'types/data/LogonResult';
import { ResponseError } from 'util/errors';
import { UserBase } from 'types/data/users/UserBase';

interface LoginResult {
  token: string,
  expires: number,
  user: UserBase
}

export default () => {
  const post = usePost<LoginResult>();

  return async (username : string | null | undefined, password : string | null | undefined, code? : string | null | undefined) => {
    const response = await post('/public/user/logon', { username, password, code, site: 'admin' });
    switch (response.code) {
      case 200:
        const data = { ...response.body };
        if (data?.user?.role !== 'Admin') return { logonResult: LogonResult.NoAdminRole };
        return { logonResult: LogonResult.Success, data };
      case 202: return { logonResult: LogonResult.TwoStepAuthRequired };
      case 400: return { logonResult: LogonResult.Blocked };
      case 401: return { logonResult: LogonResult.InCorrect };
      case 403: return { logonResult: LogonResult.InActive };
      case 418: return { logonResult: LogonResult.TwoStepAuthFailed };
      default: throw new ResponseError(response.code, 'An unknown error occurred during user logon');
    }
  };
};
