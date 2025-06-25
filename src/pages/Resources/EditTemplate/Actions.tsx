import { ButtonGroup, SaveButton } from 'sefer/components';

interface Props {
  onSave(): Promise<boolean>
}

export const Actions = (props : Props) => {
  const { onSave } = props;

  return (
      <ButtonGroup  $pull="right">
        <SaveButton onSave={onSave} />
      </ButtonGroup>
  )
}
