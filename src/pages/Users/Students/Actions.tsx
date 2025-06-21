import { Button, ButtonGroup } from 'sefer/components';
import { Student } from 'types/data/users/Student';
import { ActivateUserButton, ChangeRoleButton, MessageButton, UserBlockButton } from 'components';
import { UserRole } from 'sefer/Data/UserRole';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Actions = (props: {
    student: Student | undefined,
    onBlockChanged: (blocked: boolean) => void,
    onRoleChanged: (role?: UserRole) => void,
    onActivated: () => void
}) => {
  const { student, onBlockChanged, onRoleChanged, onActivated } = props;
  const terms = useLocalization(localization);
  if (!student) return null;

  return (
    <ButtonGroup $pull="right">
      <Button link={`/users/student/${student.id}/enrollments`} label={terms.enrollments} />
      <MessageButton user={student} />
      <UserBlockButton user={student} onBlockChanged={onBlockChanged} />
      <ChangeRoleButton user={student} onRoleChanged={onRoleChanged} />
      <ActivateUserButton user={student} onActivated={onActivated} />
    </ButtonGroup>
  );
};
