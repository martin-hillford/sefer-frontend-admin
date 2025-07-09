import { FetchContextProvider } from 'sefer-fetch';
import Logon from 'pages/Support/Logon';
import { createContext, ReactNode, useContext, useState } from 'react';
import { UserBase } from 'types/data/users/UserBase';
import { Config, useFetchConfiguration } from 'util/configuration';

export interface UserData {
    user: UserBase
    token: string
    expires: number
}

export const UserContext = createContext<UserData>({} as unknown as UserData);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = (props : { children : ReactNode}) => {
  const { children, } = props;
  const config = useFetchConfiguration();
  if (!config) return null;
  return <Provider config={config} children={children} />;
};

const Provider = (props : { children : ReactNode, config : Config}) => {
  const { children, config } = props;
  const [context, setContext] = useState(getStoredData());

  const onLogon = (token: string, expires: number, user: UserBase) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expires', expires.toString());
    setContext({ user, token, expires });
  };

  const fetchContext = { config, user: { token: context?.token } };

  return (
    <FetchContextProvider context={fetchContext}>
      {!context && <Logon onLogon={onLogon} />}
      {context && <UserContext.Provider value={context}>{children}</UserContext.Provider>}
    </FetchContextProvider>
  );
};

const getStoredData = () => {
  try {
    // Get the data from the local storage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const expires = parseInt(localStorage.getItem('expires') ?? '0');

    // If there is no user or token return
    if (!user || !expires || !token) return undefined;

    // Check if the token expired
    const now = Math.ceil(Date.now() / 1000);
    if (expires < now) return undefined;

    // Returns the data
    return { token, user: JSON.parse(user) as UserBase, expires } as UserData;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) { return undefined; }
};
