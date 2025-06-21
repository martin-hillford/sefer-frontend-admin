import { ResponseError } from 'util/errors';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { usePost } from 'sefer-fetch';

export const usePostCurriculum = () => {
  const post = usePost();
  return async (curriculum: CurriculumBase) => {
    const { code } = await post('/courses/curricula', curriculum);
    if (code === 201) return true;
    throw new ResponseError(code, 'Could not save the curriculum to the server, please try again, if the problem persists please contact the developer.');
  };
}
