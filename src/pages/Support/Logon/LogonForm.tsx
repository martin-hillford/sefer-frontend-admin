import { Button, ButtonGroup, Header, PasswordField, Text, TextField } from 'sefer/components';
import { useContext, useState } from 'react';
import { Form } from './Form';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { LanguageDropDown } from 'components';
import { AvailableLanguages } from 'components/LanguageDropDown';
import { LanguageContext } from 'sefer/context/LanguageContext';

export const LogonForm = (props : { onLogon : (username: string, password: string) => void, error : boolean}) => {
  const { onLogon, error } = props;
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const terms = useLocalization(localization);
  const context = useContext(LanguageContext)

  const onClick = () => {
    onLogon(username, password);
  };


  const onKeyUp = (_ : string, event: { key: string, keyCode: number }) => {
    if (event.key === 'Enter' || event.keyCode === 13) onLogon(username, password);
  };

  return (
    <Form>
      <Header variant="xx-large" inline>{terms.loginHeader}</Header>
      <Text>{terms.instruction}</Text>
      <TextField
        name="username"
        error={error ? terms.usernameError : ''}
        value={username}
        placeholder={terms.usernamePlaceholder}
        onChange={setUsername}
      />
      <PasswordField
        name="password"
        error={error ? terms.passwordError : ''}
        value={password}
        placeholder={terms.passwordPlaceholder}
        onChange={setPassword}
        onKeyUp={onKeyUp}
      />
      <ButtonGroup $pull="right">
        <LanguageDropDown selected={context.language as AvailableLanguages} setSelected={context.setLanguage} />
        <Button variant="primary" onClick={onClick}>{terms.login}</Button>
      </ButtonGroup>
    </Form>
  );
};
