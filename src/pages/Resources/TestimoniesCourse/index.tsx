import { Container, Header, JumbotronLayout, Loading } from 'sefer/components';
import { IdParam, Testimonies } from 'components';
import { MegaPhone } from 'sefer/icons';
import { Course } from 'types/data/Course';
import { Testimony } from 'types/data/resources/Testimony';
import { useTestimonies } from './useTestimonies';
import { useFetchCourseById } from 'hooks/useFetchCourseById';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => (
  <IdParam fallback="/content/testimonies/" onId={courseId => <Page courseId={courseId} />} />
);

const Page = ({ courseId } : {courseId : number}) => {
  const course = useFetchCourseById(courseId);
  const [testimonies, refresh] = useTestimonies(courseId);
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.testimonies, link: '/content/testimonies' },
    { label:  terms.course.replace('@name', course?.name ?? '') },
  ];

  return (
    <JumbotronLayout overflow="auto" icon={<MegaPhone size={13} />} title={terms.testimonies} subTitle={terms.whatStudentsThink} crumbs={crumbs}>
      <Content course={course} testimonies={testimonies} refresh={refresh} />
    </JumbotronLayout>
  );
};

const Content = (props : { course : Course | undefined | null, testimonies : Testimony[] | undefined, refresh : () => void }) => {
  const { course, testimonies, refresh } = props;
  if (!course || !testimonies) return <Loading variant="huge" />;
  const terms = useLocalization(localization);
  const header = terms.testimoniesFor.replace('@name', course.name);

  return (
    <Container>
      <Header variant="large" inline={false}>{header}</Header>
      <Testimonies testimonies={testimonies} refresh={refresh} course={course} />
    </Container>
  );
};
