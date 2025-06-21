import { CourseWithRevisions } from 'types/data/CourseWithRevisions';
import { CourseIdParam } from 'components';
import { Education } from 'sefer/icons';
import { BaseLayout, Loading } from 'sefer/components';
import { Content } from './Content';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useGetCourseWithEditingRevision } from 'hooks/useGetCourseWithEditingRevision';

export default () => <CourseIdParam onCourseId={(courseId) => <Page courseId={courseId} />} />;

const Page = (props : { courseId : number}) => {
  const { courseId } = props;
  const terms = useLocalization(localization);
  const [ course ] = useGetCourseWithEditingRevision(courseId);
  const crumbs = useCrumbs(course);

  if(course === null) throw new Error( `Could not fetch the editing revision for course with id: ${courseId}`);
  return (
    <BaseLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      {!course && <Loading variant="huge" />}
      {course && <Content course={course} /> }
    </BaseLayout>
  );
};

const useCrumbs = (course : CourseWithRevisions | null | undefined) => {
  const terms = useLocalization(localization);
  const courseName = terms.courseName.replace('@course',course?.name ?? '');
  const revisionNumber = terms.revisionNumber
    .replace('@revision',course?.editingRevision?.version?.toString() ?? '');

  return [
    { label: terms.courses, link: '/courses' },
    { label: courseName, link: `/courses/edit/${course?.id}` },
    { label: terms.revisions, link: `/courses/revisions/${course?.id}` },
    { label: revisionNumber }
  ];
};
