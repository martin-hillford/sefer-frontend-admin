import { JumbotronLayout, Loading } from 'sefer/components';
import { IdParam } from 'components';
import { MentorCourses } from 'types/data/users/MentorCourses';
import { Education } from 'sefer/icons';
import { Content } from './Content';
import { useGet } from 'sefer-fetch';
import { processUser } from 'util/processUsers';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => <IdParam fallback="/users" onId={userId => <Page userId={userId} />} />;

export const Page = (props : { userId : number}) => {
  const { userId } = props;
  const mentor = useFetchMentorCourse(userId);
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.users, link: '/users' },
    { label: terms.mentors, link: '/users/mentors' },
    { label: mentor?.name },
    { label: terms.courses }
  ] as BreadCrumb[];

  return (
    <JumbotronLayout icon={<Education size={13} />} {...terms}  crumbs={crumbs}>
      {!mentor && <Loading variant="huge" />}
      <Content mentor={mentor} />
    </JumbotronLayout>
  );
};

const useFetchMentorCourse = (mentorId : number) => {
    const mentor = useGet<MentorCourses>(`/users/mentors/${mentorId}/courses`);
    if (mentor) return processUser(mentor);
    if (mentor === null) throw new Error('Could not found the mentor information on the server.');
    return mentor;
}
