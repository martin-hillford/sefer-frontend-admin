import { EntitiesNotFound, EntitiesPanel, EntityForm, JumbotronLayout } from 'sefer/components';
import { User as UserIcon } from 'sefer/icons';
import { useState } from 'react';
import UserRole from 'types/data/UserRole';
import { Admin } from 'types/data/users/Admin';
import { Details } from '../Mentors/Details';
import { Actions } from './Actions';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useGetAdmins } from './useGetAdmins';

export default () => {
  const [admins, setAdmins] = useGetAdmins();
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.users, link: '/users' }, { label: terms.administrators }];
  const [selected, setSelected] = useState<Admin>();

  const updateAdmin = (update : (admin : Admin) => void) => {
    if (!selected || !admins) return;

    const admin = { ...selected };
    update(admin);

    const index = admins.findIndex(u => u.id === admin.id);
    const data = [...admins];
    data[index] = admin;

    setAdmins(data);
    setSelected(admin);
  };

  const onBlockChanged = (blocked : boolean) => {
    updateAdmin(u => u.blocked = blocked);
  };

  const onRoleChanged = (role : UserRole | undefined) => {
    if (!selected || !admins || !role) return;
    if (role === UserRole.Admin) return updateAdmin(u => u.role = role);
    setAdmins(admins.filter(u => u.id !== selected.id));
    setSelected(undefined);
  };

  const buttons = (
    <Actions
      admin={selected}
      onBlockChanged={onBlockChanged}
      onRoleChanged={onRoleChanged}
    />
  );

  const onSelect = (admin: Admin | undefined) => setSelected(admin);
  return (
    <JumbotronLayout icon={<UserIcon size={13} />} {...terms } crumbs={crumbs}>
      { admins?.length === 0 && <EntitiesNotFound header={terms.administrators} content={terms.noEntities} /> }
      <EntitiesPanel<Admin>
        data={admins}
        name="admins"
        header={terms.administrators}
        onSelect={onSelect}
        onGetLabel={u => u.name}
      >
        <EntityForm buttons={buttons}>
          <Details mentor={selected} />
        </EntityForm>
      </EntitiesPanel>
    </JumbotronLayout>
  );
};
