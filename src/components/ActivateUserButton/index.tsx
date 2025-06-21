import { Button, ConfirmDialog, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { User } from 'types/data/users/User';
import { usePostActivateUser } from './usePostActivateUser';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const ActivateUserButton = (props: { user: User | undefined, onActivated: () => void, }) => {
  const { user, onActivated } = props;
  const terms = useLocalization(localization);
  const postActivateUser = usePostActivateUser();

  const [state, setState] = useState<string | null>(null);
  if (!user) return null;

  const onCanceled = () => { setState(null); };

  const onConfirmed = async () => {
    setState('saving');
    await postActivateUser(user.id);
    setState('saved');
  };

  const onClosed = () => {
    setState(null);
    onActivated();
  };

  return (
    <>
      <ActivateDialog show={state === 'start'} onConfirmed={onConfirmed} onCanceled={onCanceled} />
      <SavingAlert show={state === 'saving'} content={terms.saving} />
      <SavedAlert show={state === 'saved'} content={terms.saved} onClosed={onClosed} />
      <Button
        show={!user.approved}
        variant="success"
        onClick={() => setState('start')}
        label={terms.buttonText}
      />
    </>
  );
};

const ActivateDialog = (props: { onConfirmed: () => void, show: boolean, onCanceled: () => void }) => {
  const { onCanceled, onConfirmed, show } = props;
  const terms = useLocalization(localization);
  if(!show) return null;
  return <ConfirmDialog {...terms} onConfirmed={onConfirmed} onCanceled={onCanceled} variant="success" />
};
