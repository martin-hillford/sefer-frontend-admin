import { usePost } from 'sefer-fetch';
import userRole from '../../types/data/UserRole';
import { ResponseError } from 'util/errors';
import { User } from 'types/data/users/User';

export const usePostUserRole = () => {
  const post = usePost();
  return async (user: User, role: userRole) => {
    const { code } = await post('/users/role', { userId: user.id, role });
    switch (code) {
      case 202: return true;
      case 204: return false;
      case 404: throw new ResponseError(code, 'Could not find the user to change the role for.');
      default: throw new ResponseError(code, 'An unknown error occurred while changing the role of the user, please contact the developer.');
    }
  }
}
