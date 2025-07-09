import { Button, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import UserRole from 'types/data/UserRole';
import { User } from 'types/data/users/User';
import { UserRoleDialog } from './UserRoleDialog';
import { RoleChangeError } from './RoleChangeError';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePostUserRole } from './usePostUserRole';

interface Props {
  onRoleChanged:  (role: UserRole | undefined) => void,
  user: User,
}

export const ChangeRoleButton = (props: Props) => {
  const { user, onRoleChanged } = props;
  const [userRole, setUserRole] = useState<UserRole | undefined>(user?.role);
  const terms = useLocalization(localization);
  const postUserRole = usePostUserRole();

  const [state, setState] = useState<string | null>(null);

  if (!user) return null;

  const onCanceled = () => { setState(null); };

  const onRoleChangeConfirmed = async (role: UserRole) => {
    if (role === user.role) return setState('role-saved');
    setState('role-saving');
    setUserRole(role);
    const changed = await postUserRole(user, role );
    if (changed) return setState('role-saved');
    return setState('role-change-error');
  };

  const onRoleClosed = () => {
    setState(null);
    onRoleChanged(userRole);
  };

  return (
    <>
      <UserRoleDialog
        show={state === 'role-start'}
        onConfirmed={onRoleChangeConfirmed}
        onCanceled={onCanceled} user={user}
      />
      <SavingAlert show={state === 'role-saving'} content={terms.saving} />
      <SavedAlert
        show={state === 'role-saved'}
        content={terms.saved}
        onClosed={onRoleClosed}
      />
      <RoleChangeError
        hide={state !== 'role-change-error'}
        onClosed={() => { setState(null); }}
      />
      <Button variant="primary" onClick={() => setState('role-start')}>{terms.role}</Button>
    </>
  );
};



