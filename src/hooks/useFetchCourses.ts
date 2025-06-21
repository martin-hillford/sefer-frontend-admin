import { Course } from 'types/data/Course';
import { useGetWithRefresh } from 'sefer-fetch';

export const useFetchCourses = () => {
  const [ courses, refresh, setCourses  ] = useGetWithRefresh<Course[]>('/courses')
  if(courses) courses.forEach(course => course.isDeletable = course.stage === 'Edit' || course.stage === 'Test');
  return { courses, refresh, setCourses }
}
