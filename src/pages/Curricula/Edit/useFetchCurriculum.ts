import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { useGet } from 'sefer-fetch';

export const useFetchCurriculum = (curriculumId : number) => {
  const curriculumBase = useGet<CurriculumBase>(`/courses/curricula/${curriculumId}`);
  if (curriculumBase === null) throw new Error('Could not load the curriculum from the server, please try again, if the problem persists please contact the developer.');
  return curriculumBase;
};
