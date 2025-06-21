import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const useFetchIsBlockNameUnique = () => {
  const post = usePost<{ response: boolean}>();
  return async (args : { id: number, name: string, year: number | undefined, curriculumId: number }) => {
    const { code, body } = await post('/courses/curricula/blocks/name', args);
    if (code === 200) return body?.response === true;
    throw new ResponseError(code, 'Error while retrieving the uniqueness of the name of the curriculum block.');
  };
}
