import { User } from 'types/data/users/User';
import { useState } from 'react';
import UserRole from 'types/data/UserRole';
import { useRoleLabels } from 'sefer/components/Role/useRoleLabels';
import { ConfirmDialog, DropDown, Property } from 'sefer/components';
import styled from 'styled-components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  onConfirmed:  (role: UserRole) => void,
  onCanceled: () => void,
  user: User,
  show: boolean
}

export const UserRoleDialog = (props: Props) => {
  const { user, onConfirmed, onCanceled, show } = props;
  const terms = useLocalization(localization);
  const [role, setRole] = useState<UserRole>(user.role);
  const options = useRoleLabels();

  if(!show) return null;

  const onConfirmedHandler = () => { onConfirmed(role); };
  const onChange = (value: string) => setRole(value as UserRole);
  const Content = () => (
    <>
      <Sizer>{terms.whichRole}</Sizer>
      <Property label={terms.role}>
        <DropDown value={role} onChange={onChange} name="userRole" options={options} />
      </Property>
    </>
  );

  return (
    <ConfirmDialog
      header={terms.header}
      content={<Content />}
      buttonText={terms.change}
      onConfirmed={onConfirmedHandler}
      onCanceled={onCanceled}
      variant="danger"
    />
  );
};

const Sizer = styled.div`
    width: 400px;
    padding-bottom: 12px;
`;
