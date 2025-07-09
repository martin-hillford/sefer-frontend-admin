import { Button, ButtonGroup, Header, Line } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const DisablingCompleted = (props : { onEnable : () => Promise<void> }) => {
  const terms = useLocalization(localization).disablingCompleted;
  const { onEnable } = props;
  return (
    <>
      <Header>{terms.title}</Header>
      <p>{terms.description}</p>
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={onEnable} variant="primary">{terms.reEnableButton}</Button>
      </ButtonGroup>
    </>
  )
}
