import { CourseMentors } from 'types/data/CourseMentors';
import { useGet } from 'sefer-fetch';

export const useFetchCourseMentors = (courseId : number) => {
  const data = useGet<CourseMentors>(`/courses/${courseId}/mentors`);
  if(data === null)  throw new Error( `Could not fetch the mentors for course with id: ${courseId}`);
  return data;
}
