import { JumbotronLayout, Loading } from 'sefer/components';
import { Pencil } from 'sefer/icons';
import { Mentor } from 'types/data/users/Mentor';
import { Content } from './Content';
import EnrollmentSummary from './EnrollmentSummary';
import { useGet, useGetWithRefresh } from 'sefer-fetch';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const [enrollments, refresh] = useGetWithRefresh<EnrollmentSummary[]>('/admin/enrollments/active');
  const mentors =  useGet<Mentor[]>('/users/mentors');
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.enrollments }];
  const loading = !mentors || !enrollments;

  return (
    <JumbotronLayout icon={<Pencil size={13} />} title={terms.enrollments} subTitle={terms.subTitle} crumbs={crumbs}>
      {loading && <Loading variant="huge" />}
      {!loading && <Content enrollments={enrollments!} mentors={mentors!} refresh={refresh} />}
    </JumbotronLayout>
  );
};
