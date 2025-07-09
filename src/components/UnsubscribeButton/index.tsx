import { Button, ConfirmDialog, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

interface Props {
  onEnrollmentChanged: (enrollment: { id: number, isActive: boolean }) => void,
  enrollment?: { id: number, isActive: boolean }
}

export const UnsubscribeButton = (props: Props) => {
  const { onEnrollmentChanged, enrollment } = props;
  const [state, setState] = useState<string | null>(null);
  const postUnroll = usePostUnenroll();
  const terms = useLocalization(localization);

  if (!enrollment?.isActive) return null;

  const onCanceled = () => { setState(null); };

  const onConfirmed = async () => {
    setState('unenroll-saving');
    await postUnroll(enrollment.id);
    setState('unenroll-saved');
  };

  const onClosed = () => {
    setState(null);
    onEnrollmentChanged(enrollment);
  };

  return (
    <>
      <UnenrollDialog show={state === 'unenroll-start'} onConfirmed={onConfirmed} onCanceled={onCanceled} />
      <SavingAlert show={state === 'unenroll-saving'} content={terms.saving} />
      <SavedAlert show={state === 'unenroll-saved'} content={terms.saved} onClosed={onClosed} />
      <Button onClick={() => setState('unenroll-start')} variant="danger">{terms.unenroll}</Button>
    </>
  );
};

const UnenrollDialog = (props: { show: boolean, onConfirmed: () => void, onCanceled: () => void }) => {
  const { show, onConfirmed, onCanceled } = props;
  const terms = useLocalization(localization);
  if(!show) return null;
  return (
    <ConfirmDialog
      {...terms}
      onConfirmed={onConfirmed}
      onCanceled={onCanceled}
      variant="danger"
    />
  );
};

const usePostUnenroll = () => {
  const post = usePost<unknown>();
  return async (enrollmentId: number) => {
    const { code } = await post('/admin/enrollments/unroll', enrollmentId);
    if (code === 204) return true;
    throw new ResponseError(code, 'Could not unsubscribe user from enrollment, please try again and contact the developer if the problem persists.');
  }
}
