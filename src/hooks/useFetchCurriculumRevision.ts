import { useGetWithRefresh } from 'sefer-fetch';
import { CurriculumWithRevisions } from 'types/data/curricula/Revision';

export const useFetchCurriculumRevision = (curriculumId : number) => {
  const url = `/courses/curricula/${curriculumId}/editing-revision`
  const state = useGetWithRefresh<CurriculumWithRevisions>(url);
  if(state[0] === null) throw new Error('Could not load the curriculum from the server, please try again, if the problem persists please contact the developer.');
  return state;
};
