import { DivisionList, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CourseMentors } from 'types/data/CourseMentors';
import { NamedEntity } from 'types/data/Entity';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePutCourseMentors } from './usePutCourseMentors';

export const Content = (props : {course : CourseMentors}) => {
  const navigate = useNavigate();
  const terms = useLocalization(localization);
  const { course } = props;
  const [state, setState] = useState('edit');
  const putCourseMentors = usePutCourseMentors()

  if (!course) return null;

  const onCancel = () => { navigate('/courses'); };

  const onSave = async (selected : NamedEntity[]) => {
    const mentors = selected.map(s => s.id as number);
    setState('saving');
    await putCourseMentors(course.id, mentors);
    setState('saved');
  };

  return (
    <Container>
      <DivisionList
        available={course.available}
        selected={course.assigned}
        onCancel={onCancel}
        onSave={onSave}
        availableLabel={terms.available}
        selectedLabel={terms.selected}
        header={terms.mentorsLabel.replace("@name",course.name)}
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
