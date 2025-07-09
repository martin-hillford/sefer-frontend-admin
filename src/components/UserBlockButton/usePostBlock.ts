import { usePost } from 'sefer-fetch';
import { ResponseError } from 'util/errors';

export const usePostBlock = () => {
  const post = usePost();
  return async (userId : number, blocked: boolean) => {
    const { code } = await post(`/users/${userId}/block`, { blocked });
    switch (code) {
      case 204: return;
      case 404: throw new ResponseError(code, 'Could not find the user to (de)block.');
      default: throw new ResponseError(code, 'An unknown error occurred while (de)blocked an user, please contact the developer.');
    }
  }
}
