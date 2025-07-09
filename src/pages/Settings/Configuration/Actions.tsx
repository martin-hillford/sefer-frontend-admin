import { Button, ButtonGroup } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Actions = (props : { save: () => void}) => {
  const terms = useLocalization(localization);
  const { save } = props;
  return (
    <ButtonGroup $pull="right">
      <Button onClick={() => save()} variant="primary">{terms.save}</Button>
    </ButtonGroup>
  )
}
