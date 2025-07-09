import { Container, Header, JumbotronLayout, Loading } from 'sefer/components';
import { MegaPhone } from 'sefer/icons';
import { useSearchParams } from 'react-router-dom';
import { Course } from 'types/data/Course';
import { Testimony } from 'types/data/resources/Testimony';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { TestimonyView } from './TestimonyView';
import { useFetchCourseById } from 'hooks/useFetchCourseById';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const courseId = parseInt(useSearchParams()[0].get('course') ?? '');
  const course = useFetchCourseById(courseId);
  const terms = useLocalization(localization);

  const loaded = course !== undefined;
  const crumbs = useCrumbs(course);

  const testimony = {
    id: -1,
    courseId,
    studentId: null,
    content: '',
    name: '',
    isAnonymous: false,
    creationDate: new Date(Date.now()),
    modificationDate: null
  };

  return (
    <JumbotronLayout overflow="auto" icon={<MegaPhone size={13} />} title={terms.testimonies} subTitle={terms.whatStudentsThink} crumbs={crumbs}>
      {!loaded && <Loading variant="huge" />}
      {loaded && <Content course={course} header={terms.editTestimony} testimony={testimony} />}
    </JumbotronLayout>
  );
};

const Content = (props : {header: string, course : Course | null, testimony : Testimony }) => (
  <Container>
    <Header inline={false} variant="large">{props.header}</Header>
    <TestimonyView {...props} />
  </Container>
);

const useCrumbs = (course : Course | null | undefined) => {
  const terms = useLocalization(localization);
  const courseName = terms.courseName.replace('@name', course?.name ?? '');
  const crumbs = [{ label: terms.testimonies, link: '/content/testimonies' }] as BreadCrumb[];
  if (course === null) crumbs.push({ label: terms.testimonies, link: '/content/testimonies/overall' });
  if (course) crumbs.push({ label: courseName, link: `/content/testimonies/course/${course.id}` });
  crumbs.push({ label: terms.addTestimony });
  return crumbs;
};
