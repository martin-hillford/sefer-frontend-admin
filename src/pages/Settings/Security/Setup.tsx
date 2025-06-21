import { Button, ButtonGroup, Header, Line } from 'sefer/components';
import { useState } from 'react';
import { TwoFactorAuthSetup } from 'types/data/settings/TwoFactorAuthSetup';
import { TwoFactorAuthState } from './hooks';
import { Key } from './Key';
import { isValidTwoFactorAuthCode } from 'components/TwoFactorAuth/isValidTwoFactorAuthCode';
import { TwoFactorAuth } from 'components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Setup = ({ setup, onActivate, state } : { state : TwoFactorAuthState, setup : TwoFactorAuthSetup | undefined, onActivate : (code : string) => Promise<void> }) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState(false);
  const terms = useLocalization(localization).setup;
  if (!setup) return null;

  const onClick = async () => {
    if (!isValidTwoFactorAuthCode(code)) setError(true);
    else await onActivate(code);
  };

  return (
    <>
      <Header>{terms.security}</Header>
      <ol>
        <li>
          <p>{terms.instruction1}</p>
        </li>
        <li>
          <p>{terms.instruction2}</p>
          <Key value={setup.manualKey} />
          <img src={setup.qrCodeImage.image} alt={setup.qrCodeImage.url} />
        </li>
        <li>
          <p>{terms.instruction3}</p>
          <TwoFactorAuth onPressEnter={onClick} validationError={error} codeError={state !== TwoFactorAuthState.Setup} onCodeChange={setCode} />
        </li>
      </ol>
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={onClick} variant="primary">{terms.activate}</Button>
      </ButtonGroup>
    </>
  );
};
