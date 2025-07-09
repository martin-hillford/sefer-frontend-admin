import { JumbotronLayout, Loading } from 'sefer/components';
import { IdParam } from 'components';
import { Education } from 'sefer/icons';
import { Content } from './Content';
import { MentorRegion } from 'types/data/users/MentorRegion';
import { useGet } from 'sefer-fetch';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => <IdParam fallback="/users" onId={userId => <Page userId={userId} />} />;

const Page = (props : { userId : number}) => {
  const { userId } = props;
  const mentor = useGet<MentorRegion>(`/users/mentors/${userId}/regions`);
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.users, link: '/users' },
    { label: terms.mentors, link: '/users/mentors' },
    { label: mentor?.name ?? '' },
    { label: terms.regions }
  ];

  return (
    <JumbotronLayout icon={<Education size={13} />} {...terms} crumbs={crumbs}>
      {!mentor && <Loading variant="huge" />}
      <Content mentor={mentor} />
    </JumbotronLayout>
  );
};
