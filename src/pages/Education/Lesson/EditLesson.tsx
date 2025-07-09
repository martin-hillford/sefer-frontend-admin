import { Navigate, useParams } from 'react-router-dom';
import { Lesson } from './Lesson';
import { useFetchLesson } from './useFetchLesson';

const EditLesson = () => {
  const { lessonId } = useParams<{ lessonId : string }>();
  if (!lessonId) return <Navigate to="/courses" />;

  const parsed = parseInt(lessonId);
  if (!parsed || Number.isNaN(parsed)) return <Navigate to="/courses" />;

  return <Page lessonId={parsed} />;
};

const Page = (props : { lessonId : number}) => {
  const { lessonId } = props;
  const lesson = useFetchLesson(lessonId);
  return <Lesson lesson={lesson} />;
};

export default EditLesson;
