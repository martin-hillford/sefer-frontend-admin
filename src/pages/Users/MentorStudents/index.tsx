import { JumbotronLayout } from 'sefer/components';
import { IdParam } from 'components';
import { Education } from 'sefer/icons';
import { MentorStudents } from 'types/data/users/MentorStudents';
import { Content } from './Content';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { useGetWithRefresh } from 'sefer-fetch';

export default () => <IdParam fallback="/users" onId={mentorId => <Main mentorId={mentorId} />} />;

const Main = (props : {mentorId : number}) => {
  const { mentorId } = props;
  const [ mentor, refresh] = useGetWithRefresh<MentorStudents>(`/users/mentors/${mentorId}/students`);
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.users, link: '/users' },
    { label: terms.mentors, link: '/users/mentors' },
    { label: mentor?.mentor?.name },
    { label: terms.students }
  ] as BreadCrumb[];

  return (
    <JumbotronLayout icon={<Education size={13} />} {...terms} crumbs={crumbs}>
      <Content data={mentor} refresh={refresh} />
    </JumbotronLayout>
  );
};
