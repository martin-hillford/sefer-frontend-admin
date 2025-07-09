import { Container, Header, JumbotronLayout, Line, Loading } from 'sefer/components';
import { MegaPhone } from 'sefer/icons';
import { Testimonies } from 'components';
import { Testimony } from 'types/data/resources/Testimony';
import { useGetWithRefresh } from 'sefer-fetch';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const [testimonies, refresh] = useGetWithRefresh<Testimony[]>('/testimonies/overall');
  const terms = useLocalization(localization);
  const crumbs = [
    { label: terms.testimonies, link: '/content/testimonies' },
    { label: terms.generalTestimonies },
  ];

  return (
    <JumbotronLayout overflow="auto" icon={<MegaPhone size={13} />} title={terms.testimonies} subTitle={terms.whatDoStudentsThink} crumbs={crumbs}>
      <Content testimonies={testimonies} refresh={refresh} />
    </JumbotronLayout>
  );
};

const Content = (props : {testimonies : Testimony[] | undefined | null, refresh : () => void }) => {
  const { testimonies, refresh } = props;
  const terms = useLocalization(localization);

  if (!testimonies) return <Loading variant="huge" />;
  return (
    <Container>
      <Header variant="large" inline={false}>{terms.generalTestimonies}</Header>
      <p>{terms.generalTestimoniesDescription}</p>
      <Line />
      <Testimonies testimonies={testimonies} refresh={refresh} course={null} />
    </Container>
  );
};
