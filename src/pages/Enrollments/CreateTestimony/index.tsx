import { Like, MegaPhone } from 'sefer/icons';
import { JumbotronLayout } from 'sefer/components';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Content } from './Content';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';

export default () => {
  const id = useSearchParams()[0].get('result');
  if (!id) return <Navigate to="/enrollments/feedback" />;
  const parsed = parseInt(id);
  if (!parsed || Number.isNaN(parsed)) return <Navigate to="/enrollments/feedback" />;
  return <Page resultId={parsed} />;
};

const Page = (props: { resultId : number }) => {
  const { resultId } = props;
  const terms = useLocalization(localization);
  const crumbs = [
    { label: terms.enrollments, link: '/enrollments' },
    { label: terms.feedback, link: '/enrollments/feedback' },
    { label: terms.newTestimony, icon: <MegaPhone size={13} /> }
  ];

  return (
    <JumbotronLayout icon={<Like size={13} />} title={terms.feedback} subTitle={terms.whatStudentsThink} crumbs={crumbs}>
      <Content resultId={resultId} />
    </JumbotronLayout>
  );
};
