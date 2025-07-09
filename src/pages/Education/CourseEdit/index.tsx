import { useParams } from 'react-router-dom';
import { EditCourse } from './EditCourse';
import { NewCourse } from './NewCourse';

export default () => {
  const { courseId } = useParams<{ courseId : string | undefined }>();
  if (!courseId) return <NewCourse />;
  const parsed = parseInt(courseId);
  if (!parsed || Number.isNaN(parsed)) return <NewCourse />;
  return <EditCourse courseId={parsed} />;
};
