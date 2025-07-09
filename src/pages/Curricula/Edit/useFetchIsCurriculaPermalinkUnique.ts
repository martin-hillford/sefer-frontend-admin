import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const useFetchIsCurriculaPermalinkUnique = () => {
  const post = usePost<{ response: boolean}>();
  return async (id: number, permalink: string) => {
    const { code, body } = await post('/courses/curricula/permalink', { id, permalink });
    if (code === 200) return body?.response === true;
    throw new ResponseError(code, 'Error while retrieving the uniqueness of the permalink of the curriculum .');
  };
}
