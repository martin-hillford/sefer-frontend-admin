import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';
import { Testimony } from 'types/data/resources/Testimony';

export const usePostTestimony = () => {
  const post = usePost<Testimony>();
  return async (testimony: Testimony) => {
    const { code, body } = await post('/testimonies', testimony);
    if (code === 201) return body!;
    throw new ResponseError(code, 'Could not a new testimony, please contact the developer.');
  };
}
