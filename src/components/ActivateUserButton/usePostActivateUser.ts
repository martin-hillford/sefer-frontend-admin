import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePostActivateUser = () => {
  const post = usePost();
  return async (userId : number) => {
    const { code } = await post(`/users/${userId}/approve`, {});
    switch (code) {
      case 204: return;
      case 404: throw new ResponseError(code, 'Could not find the account of the user to activate.');
      default: throw new ResponseError(code, 'An unknown error occurred while activating the account of the user, please contact the developer.');
    }
  }
}
