import { Container, JumbotronLayout, Loading } from 'sefer/components';
import { Settings } from 'sefer/icons';
import { Completed } from './Completed';
import { Disabled } from './Disabled';
import { Disabling } from './Disabling';
import { DisablingCompleted } from './DisablingCompleted';
import { Enabled } from './Enabled';
import { TwoFactorAuth, TwoFactorAuthState, useAuthentication } from './hooks';
import { Setup } from './Setup';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const state = useAuthentication();
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.settings, link: '/settings' },
    { label: terms.security },
  ];

  return (
    <JumbotronLayout overflow="auto" icon={<Settings size={13} />} title={terms.security} subTitle={terms.subTitle} crumbs={crumbs}>
      <Container>
        <Content {...state} />
      </Container>
    </JumbotronLayout>
  );
};

const Content = (props : TwoFactorAuth) => {
  const { state } = props;
  switch (state) {
    case TwoFactorAuthState.Disabled:
      return <Disabled {...props} />;
    case TwoFactorAuthState.Enabled:
      return <Enabled {...props} />;
    case TwoFactorAuthState.Setup:
    case TwoFactorAuthState.SetupInvalidCode:
      return <Setup {...props} />;
    case TwoFactorAuthState.SetupCompleted:
      return <Completed {...props} />;
    case TwoFactorAuthState.Disabling:
    case TwoFactorAuthState.DisablingInvalidCode:
      return <Disabling {...props} />;
    case TwoFactorAuthState.DisablingCompleted:
      return <DisablingCompleted {...props} />;
    default:
      return <Loading variant="large" />;
  }
};
