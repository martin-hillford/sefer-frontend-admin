import { CourseIdParam } from 'components';
import { Education } from 'sefer/icons';
import { JumbotronLayout, Loading } from 'sefer/components';
import { Content } from './Content';
import { useFetchCourseMentors } from './useFetchCourseMentors';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => <CourseIdParam onCourseId={(courseId) => <Page courseId={courseId} />} />;

const Page = (props : { courseId : number}) => {
  const { courseId } = props;
  const course = useFetchCourseMentors(courseId);
  const terms = useLocalization(localization);

  const courseName = terms.courseName.replace("@name",course?.name ?? '');
  const crumbs = [
    { label: terms.courses, link: '/courses' },
    { label: courseName, link: `/courses/edit/${courseId}` },
    { label: terms.mentors }
  ];

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      {!course && <Loading variant="huge" />}
      {course && <Content course={course} />}
    </JumbotronLayout>
  );
};
