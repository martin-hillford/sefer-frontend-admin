import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { ConfirmDialog } from 'sefer/components';

export const DeleteFilesDialog = (props : { onClose : () => void, show : boolean, onConfirmed : () => void }) => {
  const { onClose, onConfirmed, show } = props;
  const terms = useLocalization(localization);
  return (
    <ConfirmDialog
      {...terms.removeFileDialog}
      onConfirmed={onConfirmed}
      onCanceled={onClose}
      variant="danger"
      speed={0}
      layer={20}
      show={show}
    />
  );
};
