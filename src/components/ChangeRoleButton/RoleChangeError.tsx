import { Alert, Overlay } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const RoleChangeError = (props: { onClosed?: () => void, hide: boolean }) => {
  const { onClosed, hide } = props;
  const terms = useLocalization(localization);
  if(hide) return null;
  return (
    <Overlay>
      <Alert variant="danger" hide="auto" closable timeout={2500} onClosed={onClosed}>
        {terms.backupMentor}
      </Alert>
    </Overlay>
  );
};
