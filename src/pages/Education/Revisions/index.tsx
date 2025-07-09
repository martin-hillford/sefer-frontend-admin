import { CourseIdParam } from 'components';
import { JumbotronLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { CourseWithRevisions } from 'types/data/CourseWithRevisions';
import { Content } from './Content';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useGetWithRefresh } from 'sefer-fetch';

export default () => <CourseIdParam onCourseId={(courseId) => <Page courseId={courseId} />} />;

const Page = (props : { courseId : number}) => {
  const { courseId } = props;
  const [ course, refresh ] = useGetWithRefresh<CourseWithRevisions>(`/courses/${courseId}/editing-revision`);
  return <RefreshablePage course={course} refresh={refresh} courseId={courseId} />;
};

const RefreshablePage = (props : { courseId : number, course? : CourseWithRevisions | null, refresh : () => void}) => {
  const { course, refresh, courseId } = props;
  const terms = useLocalization(localization);
  const crumbs = getCrumbs(course);

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      {!course && <Loading variant="huge" />}
      {course && <Content refresh={refresh} courseId={courseId} course={course} /> }
    </JumbotronLayout>
  );
};

const getCrumbs = (course : CourseWithRevisions | undefined | null) => {
  const terms = useLocalization(localization);
  if (!course) return [];
  return [
    { label: terms.courses, link: '/courses' },
    { label: terms.courseName.replace("@course", course.name), link: `/courses/edit/${course.id}` },
    { label: terms.revisions }
  ];
};

