import { usePost } from 'sefer-fetch';
import { DivisionList, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NamedEntity } from 'types/data/Entity';
import { MentorRegion } from 'types/data/users/MentorRegion';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Content = (props : { mentor : MentorRegion | null | undefined }) => {
  const navigate = useNavigate();
  const terms = useLocalization(localization);
  const post = usePost();
  const { mentor } = props;
  const [state, setState] = useState('edit');

  if (!mentor) return null;

  const onCancel = () => { navigate('/users/mentors'); };
  const onSave = async (selected : NamedEntity[]) => {
    const allRegions = [...mentor.regions, ...mentor.availableRegions];
    const regions = selected.map(region => allRegions.find(s => s.id === region.id)!.id);
    setState('saving');
    await post(`/users/mentors/${mentor.id}/regions`, regions);
    setState('saved');
  };

  const availableRegions = (mentor.availableRegions ?? []).map(r => ({ ...r, name: r.id }));
  const selected = (mentor.regions ?? []).map(r => ({ ...r, name: r.id }));

  return (
    <Container>
      <DivisionList
        available={availableRegions}
        selected={selected}
        onCancel={onCancel}
        onSave={onSave}
        availableLabel={terms.availableLabel}
        selectedLabel={terms.selectedLabel}
        header={terms.header.replace('@mentor', mentor.name)}
        getEntityLabel={entity => entity.name}
      />
      <SavingAlert show={state === 'saving'}>{terms.saving}</SavingAlert>
      <SavedAlert show={state === 'saved'} redirect="/users/mentors">{terms.saved}</SavedAlert>
    </Container>
  );
};

const Container = styled.div`
    display:flex;
    @media (min-width: 1024px) {
        width: 100%;
        height: 100%;
    }
    flex-direction: column;
`;
