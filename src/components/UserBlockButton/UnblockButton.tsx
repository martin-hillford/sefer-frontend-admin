import { Button, ConfirmDialog, SavedAlert, SavingAlert } from 'sefer/components';
import { Unlock } from 'sefer/icons';
import { useState } from 'react';
import { User } from 'types/data/users/User';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePostBlock } from './usePostBlock';

export const UnblockButton = (props : {user : User, onBlockChanged : (blocked: boolean) => void}) => {
  const { user, onBlockChanged } = props;
  const [state, setState] = useState<string | null>(null);
  const terms = useLocalization(localization);
  const post = usePostBlock();

  const onCanceled = () => { setState(null); };

  const onUnblockConfirmed = async () => {
    setState('unblock-saving');
    await post(user.id, false);
    setState('unblock-saved');
  };

  const onBlockClosed = () => {
    setState(null);
    onBlockChanged(!user.blocked);
  };

  return (
    <>
      <UnblockDialog show={state === 'unblock-start'} onConfirmed={onUnblockConfirmed} onCanceled={onCanceled} />
      <SavingAlert show={state === 'unblock-saving'} content={terms.unblocking} />
      <SavedAlert show={state === 'unblock-saved'} content={terms.unblocked} onClosed={onBlockClosed} />
      <Button
        variant="danger"
        icon={<Unlock size={16} />}
        onClick={() => setState('unblock-start')}
        label={terms.unblock}
      />
    </>
  );
};

const UnblockDialog = (props : { show: boolean, onConfirmed : () => void, onCanceled : () => void}) => {
  const { onConfirmed, onCanceled, show } = props;
  const terms = useLocalization(localization);
  if(!show) return null;
  return (
    <ConfirmDialog
      {...terms.unblockDialog}
      onConfirmed={onConfirmed}
      onCanceled={onCanceled}
      variant="danger"
    />
  );
};
