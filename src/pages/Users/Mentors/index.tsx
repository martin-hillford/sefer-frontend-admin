import { EntitiesPanel, EntityForm, JumbotronLayout } from 'sefer/components';
import { User as UserIcon } from 'sefer/icons';
import { useState } from 'react';
import UserRole from 'types/data/UserRole';
import { Mentor } from 'types/data/users/Mentor';
import { Actions } from './Actions';
import { Details } from './Details';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useGetWithState } from 'sefer-fetch';
import { EntitiesNotFoundLayout } from '../../../components/EntitiesNotFoundLayout';

export default () => {
  const terms = useLocalization(localization);
  const [mentors, setMentors] = useGetWithState<Mentor[]>('/users/mentors');
  const crumbs = [{ label: terms.users, link: '/users' }, { label: terms.mentors }];
  const [selected, setSelected] = useState<Mentor>();

  const updateMentor = (update : (mentor : Mentor) => void) => {
    if (!selected || !mentors) return;

    const mentor = { ...selected };
    update(mentor);

    const index = mentors.findIndex(u => u.id === mentor.id);
    const data = [...mentors];
    data[index] = mentor;

    setMentors(data);
    setSelected(mentor);
  };

  const onRoleChanged = (role : UserRole | undefined) => {
    if (!selected || !mentors || !role) return;
    if (role === UserRole.Mentor) return updateMentor(u => u.role = role);
    setMentors(mentors.filter(u => u.id !== selected.id));
    setSelected(undefined);
  };

  if(mentors?.length === 0)
    return <EntitiesNotFoundLayout {...terms } icon={<UserIcon size={13} />} {...terms} crumbs={crumbs} content={terms.noEntities} />

  const buttons = <Actions user={selected} onRoleChanged={onRoleChanged} />;
  return (
    <JumbotronLayout icon={<UserIcon size={13} />} {...terms} crumbs={crumbs}>
      <EntitiesPanel<Mentor>
        data={mentors}
        name="mentors"
        header={terms.mentors}
        onSelect={mentor => setSelected(mentor)}
        onGetLabel={u => u.name}
      >
        <EntityForm buttons={buttons}>
          <Details mentor={selected} />
        </EntityForm>
      </EntitiesPanel>
    </JumbotronLayout>
  );
};

