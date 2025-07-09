import { Button, ButtonGroup, SaveButton } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  onSave(): Promise<boolean>
}

export const Actions = (props : Props) => {
  const { onSave } = props;
  const terms = useLocalization(localization);

  return (
      <ButtonGroup  $pull="right">
        <Button link="/content/templates">{terms.back}</Button>
        <SaveButton onSave={onSave} />
      </ButtonGroup>
  )
}
