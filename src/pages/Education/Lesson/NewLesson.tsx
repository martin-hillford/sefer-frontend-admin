import { Lesson as LessonType } from 'types/data/Lesson';
import { CourseIdParam } from 'components';
import { Lesson } from './Lesson';
import { useGetCourseWithEditingRevision } from 'hooks/useGetCourseWithEditingRevision';

const NewLesson = () => <CourseIdParam onCourseId={(courseId) => <Page courseId={courseId} />} />;

const Page = (props : { courseId : number}) => {
  const { courseId } = props;
  const [ revision ] = useGetCourseWithEditingRevision(courseId);

  if (!revision) return <Lesson />;
  const lesson = {
    course: revision,
    content: [],
    creationDate: new Date(),
    courseRevision: revision.editingRevision,
    id: -1,
    courseRevisionId: revision.editingRevision.id,
    number: '',
    name: '',
  } as LessonType;
  return <Lesson lesson={lesson} />;
};

export default NewLesson;
