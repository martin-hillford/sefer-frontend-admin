import { Button, ConfirmDialog, SavedAlert, SavingAlert } from 'sefer/components';
import { Lock } from 'sefer/icons';
import { useState } from 'react';
import { User } from 'types/data/users/User';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePostBlock } from './usePostBlock';

export const BlockButton = (props: { user: User, onBlockChanged : (blocked: boolean) => void }) => {
  const { user, onBlockChanged } = props;
  const [state, setState] = useState<string | null>(null);
  const terms = useLocalization(localization);
  const post = usePostBlock();

  const onCanceled = () => { setState(null); };

  const onBlockConfirmed = async () => {
    setState('block-saving');
    await post(user.id, true);
    setState('block-saved');
  };

  const onBlockClosed = () => {
    setState(null);
    onBlockChanged(!user.blocked);
  };

  return (
    <>
      <BlockDialog show={state === 'block-start'} onConfirmed={onBlockConfirmed} onCanceled={onCanceled} />
      <SavingAlert show={state === 'block-saving'} content={terms.blocking} />
      <SavedAlert show={state === 'block-saved'} content={terms.blocked} onClosed={onBlockClosed} />
      <Button
        variant="primary"
        icon={<Lock size={16} />}
        onClick={() => setState('block-start')}
        label={terms.block}
      />
    </>
  );
};

const BlockDialog = (props: { show: boolean, onConfirmed: () => void, onCanceled: () => void }) => {
  const { onConfirmed, onCanceled, show } = props;
  const terms = useLocalization(localization);
  if(!show) return null;
  return (
    <ConfirmDialog
      {...terms.blockDialog}
      onConfirmed={onConfirmed}
      onCanceled={onCanceled}
      variant="danger"
    />
  );
};
