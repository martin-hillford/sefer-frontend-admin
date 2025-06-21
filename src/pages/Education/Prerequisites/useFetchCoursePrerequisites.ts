import { Prerequisites } from '../../../types/data/Prerequisites';
import { useGet } from 'sefer-fetch';

export const useFetchCoursePrerequisites = (courseId : number) => {
  const prerequisites = useGet<Prerequisites>(`/courses/${courseId}/prerequisites`);
  if(prerequisites === null) throw new Error(`Could not fetch the prerequisites for course with id: ${courseId}`);
  return prerequisites;
}
