import { CourseForm } from './CourseForm';
import { useFetchCourseById } from 'hooks/useFetchCourseById';

export const EditCourse = ({ courseId } : {courseId : number}) => {
  const course = useFetchCourseById(courseId);
  return <CourseForm course={course} />;
};
