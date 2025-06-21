import { usePost } from 'sefer-fetch';
import { Alert, Button, ConfirmDialog, Overlay, SavedAlert, SavingAlert } from 'sefer/components';
import { QRCode } from 'sefer/icons';
import { useState } from 'react';
import UserRole from 'types/data/UserRole';
import { User } from 'types/data/users/User';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default (props : {user : User | undefined, onTwoAuthDisabled : () => void}) => {
  const { user, onTwoAuthDisabled } = props;
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState<boolean | undefined>(user?.twoFactorAuthEnabled);
  const post = usePost();
  const [state, setState] = useState<string | null>(null);
  const terms = useLocalization(localization).disableTwoAuth;

  if (!user?.twoFactorAuthEnabled || user?.role === UserRole.Admin) return null;

  const onCanceled = () => { setState(null); };

  const onDisableConfirmed = async () => {
    if (!twoFactorAuthEnabled) return setState('disabled');
    setState('disabling');
    const { code } = await post('/users/disable-two-factor-auth', { userId: user.id });
    const disabled = code === 202;
    if (disabled) setTwoFactorAuthEnabled(false);
    if (disabled) return setState('disabled');
    return setState('error');
  };

  const onClosed = () => {
    setState(null);
    onTwoAuthDisabled();
  };

  return (
    <>
      <Confirm show={state === 'confirming'} onConfirmed={onDisableConfirmed} onCanceled={onCanceled} user={user} />
      <SavingAlert show={state === 'disabling'} content={terms.disabling} />
      <SavedAlert show={state === 'disabled'} content={terms.disabled} onClosed={onClosed} />
      <DisableError show={state === 'error'} onClosed={() => { setState(null); }} />
      <Button icon={<QRCode size={16} />} variant="danger" onClick={() => setState('confirming')} label={terms.disable} />
    </>
  );
};

const Confirm = (props : { show: boolean, onConfirmed : () => void, onCanceled : () => void, user : User }) => {
  const { user, onConfirmed, onCanceled, show } = props;
  const terms = useLocalization(localization).disableTwoAuth;
  if(!show) return null;
  return (
    <ConfirmDialog
      header={terms.header}
      content={terms.content.replace('@name', user.name)}
      buttonText={terms.buttonText}
      onConfirmed={onConfirmed}
      onCanceled={onCanceled}
      variant="danger"
    />
  );
};

const DisableError = (props : { show: boolean, onClosed? : () => void }) => {
  const { onClosed, show } = props;
  const terms = useLocalization(localization).disableTwoAuth;
  if(!show) return  null;
  return (
    <Overlay>
      <Alert variant="danger" hide="auto" closable timeout={2500} onClosed={onClosed}>
        {terms.error}
      </Alert>
    </Overlay>
  );
};
