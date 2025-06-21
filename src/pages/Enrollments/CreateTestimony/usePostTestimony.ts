import { ResponseError } from 'util/errors';
import { Testimony } from 'types/data/enrollments/Testimony';
import { usePost } from 'sefer-fetch';

export const usePostTestimony = () => {
  const post = usePost();
  return async (testimony : Testimony) => {
    const { code } = await post('/testimonies', testimony);
    if (code === 201) return;
    throw new ResponseError(code, 'Could not a new testimony, please contact the developer.');
  };
}
