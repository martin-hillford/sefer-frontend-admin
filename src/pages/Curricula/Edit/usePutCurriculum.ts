import { ResponseError } from 'util/errors';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { usePut } from 'sefer-fetch';

export const usePutCurriculum = () => {
  const put = usePut();
  return async (curriculum: CurriculumBase) => {
    const { code } = await put(`/courses/curricula/${curriculum.id}`, curriculum);
    if (code === 202) return true;
    throw new ResponseError(code, 'Could not save the curriculum to the server, please try again, if the problem persists please contact the developer.');
  }
}
