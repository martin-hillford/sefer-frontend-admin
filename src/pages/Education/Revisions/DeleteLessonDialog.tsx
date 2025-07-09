import { ConfirmDialog as Confirm } from 'sefer/components/ConfirmDialog';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const DeleteLessonDialog = (props : { show: boolean, onConfirmed : () => void, onCanceled : () => void}) => {
  const { onConfirmed, onCanceled, show } = props;
  const terms = useLocalization(localization).lessonDeleteDialog
  if(!show) return null;

  return (
    <Confirm
      {...terms}
      onConfirmed={onConfirmed}
      onCanceled={onCanceled}
      variant="danger"
    />
  );
};
