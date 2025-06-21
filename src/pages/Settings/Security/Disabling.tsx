import { Button, ButtonGroup, Header, Line } from 'sefer/components';
import { useState } from 'react';
import { TwoFactorAuthState } from './hooks';
import { TwoFactorAuth } from 'components';
import { isValidTwoFactorAuthCode } from 'components/TwoFactorAuth/isValidTwoFactorAuthCode';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Disabling = (props : { onDisable : (code : string) => void, state : TwoFactorAuthState}) => {
  const { onDisable, state } = props;
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState(false);
  const terms = useLocalization(localization).disabling;

  const onClick = () => {
    if (!isValidTwoFactorAuthCode(code)) setError(true);
    else onDisable(code);
  };

  return (
    <>
      <Header>{terms.security}</Header>
      <p>{terms.disable2faPrompt}</p>
      <TwoFactorAuth onPressEnter={onClick} onCodeChange={setCode} validationError={error} codeError={state !== TwoFactorAuthState.Disabling} />
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={onClick} variant="primary">{terms.disable}</Button>
      </ButtonGroup>
    </>
  );
};
