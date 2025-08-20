import { EntitiesPanel, EntityForm, JumbotronLayout } from 'sefer/components';
import { User as UserIcon } from 'sefer/icons';
import { useState } from 'react';
import UserRole from 'types/data/UserRole';
import { Supervisor } from 'types/data/users/Supervisor';
import { Details } from '../Mentors/Details';
import { Actions } from './Actions';
import { useFetchSupervisors } from './useFetchSupervisors';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { EntitiesNotFoundLayout } from '../../../components/EntitiesNotFoundLayout';

export default () => {
  const { supervisors, setSupervisors } = useFetchSupervisors();
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.users, link: '/users' }, { label: terms.supervisors }];
  const [selected, setSelected] = useState<Supervisor>();


  const updateSupervisor = (supervisor : Supervisor) => {
    if (!supervisors) return;

    const index = supervisors.findIndex(u => u.id === supervisor.id);
    const data = [...supervisors];
    data[index] = supervisor;

    setSupervisors(data);
    setSelected(supervisor);
  };

  const onBlockChanged = (blocked : boolean) => {
    if (selected) updateSupervisor({ ...selected, blocked });
  };

  const onRoleChanged = (role : UserRole | undefined) => {
    if (!selected || !supervisors || !role) return;
    if (role === UserRole.Supervisor) updateSupervisor({ ...selected, role });
    setSupervisors(supervisors.filter(u => u.id !== selected.id));
    setSelected(undefined);
  };

  const buttons = (
    <Actions
      supervisor={selected}
      onBlockChanged={onBlockChanged}
      onRoleChanged={onRoleChanged}
    />
  );

  if(supervisors?.length === 0)
    return <EntitiesNotFoundLayout {...terms } icon={<UserIcon size={13} />} {...terms} crumbs={crumbs} />


  return (
    <JumbotronLayout icon={<UserIcon size={13} />} {...terms} crumbs={crumbs}>
      <EntitiesPanel<Supervisor>
        data={supervisors}
        name="supervisors"
        header={ terms.header}
        onSelect={supervisor => setSelected(supervisor)}
        onGetLabel={u => u.name}
      >
        <EntityForm buttons={buttons}>
          <Details mentor={selected} />
        </EntityForm>
      </EntitiesPanel>
    </JumbotronLayout>
  );
};
