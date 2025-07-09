import { Button, ButtonGroup, Header, Line } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';


export const Disabled = (props : { onEnable : () => Promise<void> }) => {
  const { onEnable } = props;
  const terms = useLocalization(localization).disabled;
  return (
    <>
      <Header>{terms.header}</Header>
      <p>{terms.noTwoFactorAuth}</p>
      <p>{terms.enableTwoFactorExplanation}</p>
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={onEnable} variant="primary">{terms.enableButton}</Button>
      </ButtonGroup>
    </>
  );
};
