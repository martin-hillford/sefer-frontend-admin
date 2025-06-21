import { JumbotronLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { Mentor } from 'types/data/users/Mentor';
import { StudentEnrollments } from 'types/data/users/StudentEnrollments';
import Enrollments from './Enrollments';
import { useGet, useGetWithState } from 'sefer-fetch';
import { useBreadCrumbs } from './useBreadCrumbs';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Page = (props : { userId : number}) => {
  const { userId } = props;
  const terms = useLocalization(localization);
  const [data, setData] = useGetWithState<StudentEnrollments>(`/admin/enrollments/student/${userId}`)
  const mentors = useGet<Mentor[]>('/users/mentors');
  const loading = !data || !mentors;
  const crumbs = useBreadCrumbs(!loading, data);

  const onEnrollmentChanged = async () => {
    setData(undefined);
    const reload = useGet<StudentEnrollments>(`/admin/enrollments/student/${userId}`);
    setData(reload);
  };

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      {loading && <Loading variant="huge" />}
      {!loading && <Enrollments data={data} mentors={mentors} onEnrollmentChanged={onEnrollmentChanged} /> }
    </JumbotronLayout>
  );
};
