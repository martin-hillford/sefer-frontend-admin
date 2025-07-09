import { Button, ButtonGroup, Header, Link, Text } from 'sefer/components';
import { useState } from 'react';
import { Form } from './Form';
import { isValidTwoFactorAuthCode } from 'components/TwoFactorAuth/isValidTwoFactorAuthCode';
import { TwoFactorAuth } from 'components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const TwoFactorForm = (props : { error? : boolean, onTwoFactorAuth : (code : string) => void}) => {
  const { onTwoFactorAuth, error } = props;
  const [code, setCode] = useState<string>('');
  const [hasError, setHasError] = useState(error);
  const terms = useLocalization(localization);

  const onClick = () => {
    if (!isValidTwoFactorAuthCode(code)) return setHasError(true);
    return onTwoFactorAuth(code);
  };

  return (
    <Form>
      <Header variant="xx-large" inline>{terms.loginHeader}</Header>
      <Text>{terms.authCodeInstruction}</Text>
      <TwoFactorAuth onPressEnter={onClick} onCodeChange={setCode} validationError={hasError} codeError={error} />
      <Text>
        {terms.noAuthAppAccess}<br />
        <Link to="/logon/emergency" text={terms.emergencyLoginLink} />
      </Text>
      <ButtonGroup $pull="right">
        <Button variant="primary" onClick={onClick}>{terms.loginButton}</Button>
      </ButtonGroup>
    </Form>
  );
};
