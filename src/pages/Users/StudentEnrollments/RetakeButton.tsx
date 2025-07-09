import { Button, ConfirmDialog, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePost } from 'sefer-fetch';
import { ResponseError } from 'util/errors';

interface Enrollment { canStudentReEnroll: boolean, id: number }

interface Props {
  onEnrollmentChanged : (enrollmentId: number) => void
  enrollment? : Enrollment
}

export const RetakeButton = (props : Props) => {
  const { onEnrollmentChanged, enrollment } = props;
  const [state, setState] = useState<string | null>(null);
  const terms = useLocalization(localization);
  const postRetake = usePostRetake();

  if (!enrollment?.canStudentReEnroll) return null;

  const onCanceled = () => { setState(null); };
  const onConfirmed = async () => {
    setState('retake-saving');
    await postRetake(enrollment.id);
    setState('retake-saved');
  };

  const onClosed = () => {
    setState(null);
    onEnrollmentChanged(enrollment.id);
  };

  return (
    <>
      <RetakeDialog show={state === 'retake-start'} onConfirmed={onConfirmed} onCanceled={onCanceled} />
      <SavingAlert show={state === 'retake-saving'} content={terms.retakeSaving} />
      <SavedAlert show={state === 'retake-saved'} content={terms.retakeSaved} onClosed={onClosed} />
      <Button onClick={() => setState('retake-start')} variant="primary">{terms.retake}</Button>
    </>
  );
};

const RetakeDialog = (props : { show: boolean, onConfirmed : () => void, onCanceled : () => void}) => {
  const terms = useLocalization(localization).retakeDialog
  return <ConfirmDialog {...terms} {...props} variant="primary" />;
};

const usePostRetake =() => {
  const post = usePost();
  return  async (enrollmentId : number) => {
    const { code } = await post('/admin/enrollments/allow-retake', enrollmentId);
    if (code === 204) return true;
    throw new ResponseError(code, 'Changing the retake status of an enrollment failed.');
  };
}
