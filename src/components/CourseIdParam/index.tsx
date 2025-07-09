import { Navigate, useParams } from 'react-router-dom';
import { JSX } from 'react';

type Props = { onCourseId : (courseId : number) => JSX.Element }

export const CourseIdParam = (props : Props) => {
  const { onCourseId } = props;
  const { courseId } = useParams<{ courseId : string | undefined }>();

  if (!courseId) return <Navigate to="/courses" />;
  const parsed = parseInt(courseId);

  if (!parsed || Number.isNaN(parsed)) return <Navigate to="/courses" />;
  return onCourseId(parsed);
};
