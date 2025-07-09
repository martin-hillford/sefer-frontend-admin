import { Button, ButtonGroup } from 'sefer/components';
import { Education } from 'sefer/icons';
import { ChangeRoleButton, MessageButton } from 'components';
import { User } from 'types/data/users/User';
import { UserRole } from 'sefer/Data/UserRole';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';

export const Actions = (props: { user: User | undefined, onRoleChanged: (role?: UserRole) => void }) => {
  const { user, onRoleChanged } = props;
  const terms = useLocalization(localization);
  if (!user) return null;

  return (
    <ButtonGroup $pull="right">
      <Button icon={<Education size={16} />} link={`/users/mentors/${user.id}/courses`}>{terms.courses}</Button>
      <Button link={`/users/mentors/${user.id}/regions`}>{terms.regions}</Button>
      <Button link={`/users/mentors/${user.id}/students`}>{terms.students}</Button>
      <MessageButton user={user} />
      <ChangeRoleButton user={user} onRoleChanged={onRoleChanged} />
    </ButtonGroup>
  );
};
