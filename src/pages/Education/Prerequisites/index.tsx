import { CourseIdParam } from 'components';
import { Education } from 'sefer/icons';
import { JumbotronLayout, Loading } from 'sefer/components';
import { Content } from './Content';
import { useFetchCoursePrerequisites } from './useFetchCoursePrerequisites';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => <CourseIdParam onCourseId={(courseId) => <Page courseId={courseId} />} />;

const Page = (props : { courseId : number}) => {
  const { courseId } = props;
  const terms = useLocalization(localization);
  const prerequisites = useFetchCoursePrerequisites(courseId);

  const name = terms.courseName.replace("@name",prerequisites?.name ?? '');
  const crumbs = [
    { label: terms.courses, link: '/courses' },
    { label: name, link: `/courses/edit/${courseId}` },
    { label: terms.prerequisites }
  ];

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      {!prerequisites && <Loading variant="huge" />}
      {prerequisites && <Content prerequisites={prerequisites} />}
    </JumbotronLayout>
  );
};
