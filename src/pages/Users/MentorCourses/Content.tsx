import { DivisionList, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NamedEntity } from 'types/data/Entity';
import { MentorCourses } from 'types/data/users/MentorCourses';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePostMentorCourse } from './usePostMentorCourses';

export const Content = (props : { mentor : MentorCourses | undefined | null }) => {
  const terms = useLocalization(localization);
  const postMentorCourse = usePostMentorCourse();
  const navigate = useNavigate();
  const { mentor } = props;
  const [state, setState] = useState('edit');

  if (!mentor) return null;

  const onCancel = () => { navigate('/users/mentors'); };
  const onSave = async (selected : NamedEntity[]) => {
    const courses = selected.map(s => s.id as number);
    setState('saving');
    await postMentorCourse({ courses, mentorId: mentor.id });
    setState('saved');
  };

  return (
    <Container>
      <DivisionList
        available={mentor.availableCourses}
        selected={mentor.courses}
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
