import { Button, ButtonGroup, Header, Line } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Enabled = (props : { onDisableSetup : () => void }) => {
  const terms = useLocalization(localization).enabled;
  const { onDisableSetup } = props;
  return (
  <>
    <Header>{terms.header}</Header>
    <p>{terms.description}</p>
    <Line />
    <ButtonGroup $pull="right">
      <Button onClick={onDisableSetup} variant="danger">{terms.disableButton}</Button>
    </ButtonGroup>
  </>
);
}
