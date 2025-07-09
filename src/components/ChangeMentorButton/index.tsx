import { Button, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { Mentor } from 'types/data/users/Mentor';
import { ChangeMentorDialog } from './ChangeMentorDialog';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

interface Enrollment {
  isActive: boolean,
  mentorId?: number | undefined | null
  id: number
}

interface Props {
    onEnrollmentChanged: (enrollment: Enrollment) => void
    enrollment: Enrollment
    mentors: Mentor[]
}

const errorMsg = 'Could not change the mentor for the current student, please try again and contact the developer if the problem persists.'

export const ChangeMentorButton = (props: Props) => {
  const { onEnrollmentChanged, enrollment, mentors } = props;
  const terms = useLocalization(localization);
  const [state, setState] = useState<string | null>(null);
  const [current, setMentor] = useState<number | undefined | null>(enrollment.mentorId);
  const post = usePost<unknown>();

  if (!mentors || !enrollment?.isActive) return null;

  const onCanceled = () => { setState(null); };

  const onClosed = () => {
    setState(null);
    onEnrollmentChanged(enrollment);
  };

  const onMentorChanged = async () => {
    setState('change-mentor-saving');
    const data = { mentorId: current, enrollmentId: enrollment.id };
    const response = await post('/admin/enrollments/change-mentor',data);
    if (response.code !== 204) throw new ResponseError(response.code, errorMsg);
    setMentor(current);
    setState('change-mentor-saved');
  };

  const mentor = mentors.find(m => m.id === current);
  const savedMsg = terms.saved.replace('@name', mentor?.name ?? '');
  return (
    <>
      <ChangeMentorDialog
        show={state === 'change-mentor-start'}
        mentor={mentor}
        mentors={mentors}
        onMentorChange={setMentor}
        onConfirmed={onMentorChanged}
        onCanceled={onCanceled}
      />
      <SavingAlert show={state === 'change-mentor-saving'} content={terms.saving} />
      <SavedAlert show={state === 'change-mentor-saved'} content={savedMsg} onClosed={onClosed} />
      <Button onClick={() => setState('change-mentor-start')} variant="primary">{terms.changeMentor}</Button>
    </>
  );
};
