import { Container, Header, JumbotronLayout, Loading } from 'sefer/components';
import { IdParam } from 'components';
import { MegaPhone } from 'sefer/icons';
import { Course } from 'types/data/Course';
import { Testimony } from 'types/data/resources/Testimony';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { TestimonyView } from './TestimonyView';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useFetchTestimony } from './useFetchTestimony';

export default () => <IdParam fallback="/content/testimonies" onId={id => <Page testimonyId={id} />} />;

const Page = (props : { testimonyId : number }) => {

  const { testimony, course } = useFetchTestimony(props.testimonyId);
  const terms = useLocalization(localization);

  const loaded = testimony && course !== undefined;

  const courseName = terms.courseName.replace('@name', course?.name ?? '');
  const crumbs = [{ label: terms.testimonies, link: '/content/testimonies' }] as BreadCrumb[];
  if (course) crumbs.push({ label: courseName, link: `/content/testimonies/course/${course.id}` });
  if (course === null) crumbs.push({ label: terms.generalTestimonies, link: '/content/testimonies/overall' });
  crumbs.push({ label: terms.editTestimony});

  return (
    <JumbotronLayout overflow="auto" icon={<MegaPhone size={13} />} title={terms.testimonies} subTitle={terms.whatStudentsThink} crumbs={crumbs}>
      {!loaded && <Loading variant="huge" />}
      {loaded && <Content header={terms.editTestimony} course={course} testimony={testimony} />}
    </JumbotronLayout>
  );
};

const Content = (props : {course : Course | null, header: string, testimony : Testimony }) => (
  <Container>
    <Header inline={false} variant="large">{props.header}</Header>
    <TestimonyView {...props} />
  </Container>
);
