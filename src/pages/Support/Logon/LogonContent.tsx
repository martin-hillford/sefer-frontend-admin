import LogonResult from 'types/data/LogonResult';
import { Navigate } from 'react-router-dom';
import { LogonForm } from './LogonForm';
import { TwoFactorForm } from './TwoFactorForm';
import Error from '../Error/Error';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  onLogon : (username: string, password: string) => void,
  logonResult : number,
  onTwoFactorAuth : (code : string) => void
}

export const LogonContent = (props : Props) => {
  const { onLogon, logonResult, onTwoFactorAuth } = props;
  const terms = useLocalization(localization);

  switch (logonResult) {
    case LogonResult.NotLoggedOn:
      return <LogonForm error={false} onLogon={onLogon} />;
    case LogonResult.InCorrect:
      return <LogonForm error onLogon={onLogon} />;
    case LogonResult.TwoStepAuthFailed:
      return <TwoFactorForm onTwoFactorAuth={onTwoFactorAuth} error />;
    case LogonResult.Blocked:
      return <Error>{terms.blocked}</Error>;
    case LogonResult.NoAdminRole:
      return <Error>{terms.noAccess}</Error>;
    case LogonResult.InActive:
      return <Error>{terms.activation}</Error>;
    case LogonResult.TwoStepAuthRequired:
      return <TwoFactorForm onTwoFactorAuth={onTwoFactorAuth} />;
    case LogonResult.Success:
      if (window.location.pathname.includes('/logon')) return <Navigate to="/dashboard" />;
      window.location.reload();
      return null;
    default:
      return null;
  }
};
