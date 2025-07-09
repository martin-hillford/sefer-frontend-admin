/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import styled from 'styled-components';
import LogonResult from 'types/data/LogonResult';
import { UserBase } from 'types/data/users/UserBase';
import { Colors } from 'sefer/types/Colors';
import EmergencyLogon from '../EmergencyLogon';
import { LogonContent } from './LogonContent';
import useLogonPost from './useLogonPost';

export default (props : { onLogon : (token: string, expires: number, user: UserBase) => void }) => {
  const { onLogon } = props;
  const [logonResult, setLogonResult] = useState<number>(LogonResult.NotLoggedOn);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const logon = useLogonPost();

  const setContext = (data : any) => onLogon(data.token, data.expires, data.user);

  const onSubmit = async (user : string, pwd : string) => {
    setUsername(user); setPassword(pwd);
    const result = await logon(user, pwd, null);
    if (result.logonResult === LogonResult.Success) setContext(result.data);
    setLogonResult(result.logonResult);
  };

  const onTwoFactorAuth = async (code : string) => {
    const result = await logon(username, password, code);
    if (result.logonResult === LogonResult.Success) setContext(result.data);
    setLogonResult(result.logonResult);
  };

  // Check if the special emergency logon page needs to be used
  if (window.location.pathname === '/logon/emergency') return <EmergencyLogon onLogon={onLogon} />;

  return (
    <Wrapper>
      <LogonContent
        onLogon={onSubmit}
        logonResult={logonResult}
        onTwoFactorAuth={onTwoFactorAuth}
      />
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
