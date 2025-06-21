import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const useFetchIsCurriculaNameUnique = () => {
  const post = usePost<{ response: boolean}>();
  return async (id: number, name: string) => {
    const { code, body } = await post('/courses/curricula/name', { id, name });
    if (code === 200) return body?.response === true;
    throw new ResponseError(code, 'Error while retrieving the uniqueness of the name of the curriculum.');
  };
}
