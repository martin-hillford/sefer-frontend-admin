import { NavigationContext } from 'sefer/context/NavigationContext';
import { useFetchNavigation } from './useFetchNavigation';
import { ReactNode } from 'react';
import { useAdminFrontendConfig } from '../../hooks/useAdminFrontendConfig';

export const NavigationProvider = (props: { children: ReactNode}) => {
  const groups = useFetchNavigation();
  const config = useAdminFrontendConfig();

  if(!groups) return null;
  const context = { navigation: { groups }, publicSite: config?.publicSite ?? '/'}
  return (
    <NavigationContext.Provider value={context}>
      {props.children}
    </NavigationContext.Provider>
  );
}
