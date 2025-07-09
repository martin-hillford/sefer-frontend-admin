/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePost } from 'sefer-fetch';
import { Button, ButtonGroup, Header, PasswordField, Text, TextField } from 'sefer/components';
import { useState } from 'react';
import styled from 'styled-components';
import LogonResult from 'types/data/LogonResult';
import { UserBase } from 'types/data/users/UserBase';
import { Form } from '../Logon/Form';
import useLogonPost from '../Logon/useLogonPost';
import { Colors } from 'sefer/types/Colors';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default (props : { onLogon : (token: string, expires: number, user: UserBase) => any }) => {
  const { onLogon } = props;
  const post = usePost<any>();
  const postLogon = useLogonPost();
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [backupKey, setBackupKey] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const setContext = (data : any) => onLogon(data.token, data.expires, data.user);
  const terms = useLocalization(localization);

  const onClick = async () => {
    // First, check if the emergency logon is correct
    const emergency = await post('/account/two-factor-authentication/emergency', { username, password, backupKey, store: 'admin', language: 'nl' });
    setError(!emergency.ok);
    if (!emergency.ok) return;

    // if it is correct, use the regular logon sequence
    const result = await postLogon(username, password);
    if (result.logonResult === LogonResult.Success) setContext(result.data);
    setError(false);
  };

  return (
    <Wrapper>
      <Form>
        <Header variant="xx-large" inline>{terms.title}</Header>
        <Text>{terms.description}</Text>
        <TextField
          name="username"
          autoComplete="username"
          error={error ? terms.errorUsername : ''}
          value={username}
          placeholder={terms.placeholderUsername}
          onChange={setUsername}
        />
        <PasswordField
          name="password"
          error={error ? terms.errorPassword : ''}
          value={password}
          placeholder={terms.placeholderPassword}
          onChange={setPassword}
          autoComplete="current-password"
        />
        <TextField
          name="code"
          error={error ? terms.errorBackupCode : ''}
          value={backupKey}
          placeholder={terms.placeholderCode}
          onChange={setBackupKey}
        />
        <ButtonGroup $pull="right">
          <Button variant="primary" onClick={onClick}>{terms.buttonLogin}</Button>
        </ButtonGroup>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${Colors.Blue};
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
