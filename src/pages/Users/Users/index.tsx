import { EntitiesNotFound, EntitiesPanel, EntityForm, JumbotronLayout } from 'sefer/components';
import { User as UserIcon } from 'sefer/icons';
import { useRegions } from 'hooks/useRegions';
import useSites from 'hooks/useSites';
import { useState } from 'react';
import UserRole from 'types/data/UserRole';
import Region from 'types/data/resources/Region';
import Site from 'types/data/resources/Site';
import { User } from 'types/data/users/User';
import { Actions } from './Actions';
import { Details } from './Details';
import useFetchUsers from './useFetchUsers';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const { users, setUsers } = useFetchUsers();
  const regions = useRegions();
  const sites = useSites();
  const crumbs = [{ label: 'Gebruikers' }];
  const [selected, setSelected] = useState<User>();
  const terms = useLocalization(localization);

  const updateUser = (user : User) => {
    if (!selected || !users) return;

    const index = users.findIndex(u => u.id === user.id);
    const data = [...users];
    data[index] = user;

    setUsers(data);
    setSelected(user);
  };

  const onBlockChanged = (blocked : boolean) => {
    if (selected) updateUser({ ...selected, blocked });
  };

  const onRoleChanged = (role : UserRole | undefined) => {
    if (selected && role) updateUser({ ...selected, role });
  };

  const onActivated = () => {
    if (selected) updateUser({ ...selected, approved: true });
  };

  const onRegionOrSiteChanged = (region: Region, site: Site) => {
    if (selected) updateUser({ ...selected, primaryRegion: region.id, primarySite: site.hostname });
  };

  const onTwoAuthDisabled = () => {
    if (selected) updateUser({ ...selected, twoFactorAuthEnabled: false });
  };

  const buttons = (
    <Actions
      user={selected}
      onBlockChanged={onBlockChanged}
      onRoleChanged={onRoleChanged}
      onActivated={onActivated}
      onRegionOrSiteChanged={onRegionOrSiteChanged}
      regions={regions}
      sites={sites}
      onTwoAuthDisabled={onTwoAuthDisabled}
    />
  );

  const data = !regions ? undefined : users;
  return (
    <JumbotronLayout icon={<UserIcon size={13} />} {...terms} crumbs={crumbs}>
      { users?.length === 0 && <EntitiesNotFound header="Gebruikers" content={terms.noUsersInSystem} /> }
      <EntitiesPanel<User> data={data} name="users" header={terms.users} onSelect={user => setSelected(user)} onGetLabel={u => u.name}>
        <EntityForm buttons={buttons}>
          <Details user={selected} regions={regions} />
        </EntityForm>
      </EntitiesPanel>
    </JumbotronLayout>
  );
};

