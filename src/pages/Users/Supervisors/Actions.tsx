import { Button, ButtonGroup } from 'sefer/components';
import { Education } from 'sefer/icons';
import { MessageButton, UserBlockButton } from 'components';
import { Supervisor } from 'types/data/users/Supervisor';
import { ChangeRoleButton } from 'components/ChangeRoleButton';
import { UserRole } from 'sefer/Data/UserRole';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Actions = (props: {
    supervisor: Supervisor | undefined,
    onBlockChanged: (blocked: boolean) => void,
    onRoleChanged: (role: UserRole | undefined) => void
}) => {
  const { supervisor, onBlockChanged, onRoleChanged } = props;
  const terms = useLocalization(localization);
  if (!supervisor) return null;

  return (
    <ButtonGroup $pull="right">
      <Button
        icon={<Education size={16} />}
        link={`/users/mentors/${supervisor.id}/courses`}
        label={terms.courses}
      />
      <Button link={`/users/mentors/${supervisor.id}/students`} label={terms.students} />
      <MessageButton user={supervisor} />
      <UserBlockButton user={supervisor} onBlockChanged={onBlockChanged} />
      <ChangeRoleButton user={supervisor} onRoleChanged={onRoleChanged} />
    </ButtonGroup>
  );
};
