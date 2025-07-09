import { DivisionList, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NamedEntity } from 'types/data/Entity';
import { Prerequisites } from 'types/data/Prerequisites';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePutCoursePrerequisites } from './usePutCoursePrerequisites';

export const Content = (props : {prerequisites : Prerequisites}) => {
  const { prerequisites } = props;
  const navigate = useNavigate();
  const [state, setState] = useState('edit');
  const terms = useLocalization(localization);
  const postCoursePrerequisites = usePutCoursePrerequisites();

  if (!prerequisites) return null;

  const onCancel = () => { navigate('/courses'); };

  const onSave = async (selected : NamedEntity[]) => {
    const courses = selected.map(s => s.id as number);
    setState('saving');
    await postCoursePrerequisites(courses, prerequisites.id);
    setState('saved');
  };

  return (
    <Container>
      <DivisionList
        available={prerequisites.availableCourses}
        selected={prerequisites.requiredCourses}
        onCancel={onCancel}
        onSave={onSave}
        availableLabel={terms.available}
        selectedLabel={terms.selected}
        header={terms.prerequisitesLabel.replace('@name',prerequisites.name)}
        getEntityLabel={entity => entity.name}
      />
      <SavingAlert show={state === 'saving'}>{terms.saving}</SavingAlert>
      <SavedAlert show={state === 'saved'} redirect="/courses">{terms.saved}</SavedAlert>
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
