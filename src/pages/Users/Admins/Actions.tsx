import { Button, ButtonGroup } from 'sefer/components';
import { Education } from 'sefer/icons';
import { MessageButton, UserBlockButton } from 'components';
import { Admin } from 'types/data/users/Admin';
import { ChangeRoleButton } from 'components/ChangeRoleButton';
import { UserRole } from 'sefer/Data/UserRole';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  admin: Admin | undefined,
  onBlockChanged: (blocked: boolean) => void,
  onRoleChanged: (role?: UserRole) => void
}

export const Actions = (props: Props) => {
  const { admin, onBlockChanged, onRoleChanged } = props;
  const terms = useLocalization(localization);
  if (!admin) return null;

  return (
    <ButtonGroup $pull="right">
      <Button
        icon={<Education size={16} />}
        link={`/users/mentors/${admin.id}/courses`}
        label={terms.courses}
      />
      <Button
        link={`/users/mentors/${admin.id}/students`}
        label={terms.students}
      />
      <MessageButton user={admin} />
      <UserBlockButton user={admin} onBlockChanged={onBlockChanged} />
      <ChangeRoleButton user={admin} onRoleChanged={onRoleChanged} />
    </ButtonGroup>
  );
};
