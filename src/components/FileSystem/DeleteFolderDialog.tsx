import { ConfirmDialog } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const DeleteFolderDialog = (props : { onClose : () => void, show : boolean, onConfirmed : () => void }) => {
  const { onClose, onConfirmed, show } = props;
  const terms = useLocalization(localization);
  return (
    <ConfirmDialog
      {...terms.removeFolderDialog}
      onConfirmed={onConfirmed}
      onCanceled={onClose}
      variant="danger"
      show={show}
      speed={0}
      layer={20}
    />
  );
};
