import { ConfirmDialog, SavedAlert, SavingAlert } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Dialogs = (props : { state : string, onCanceled : () => void, onClosed : () => void, onDelete : () => void, onTakeOffline : () => void, onPublish : () => void }) => {
  const { state, onCanceled, onDelete, onClosed, onTakeOffline, onPublish } = props;
  const terms = useLocalization(localization);

  return (
    <>
      <Delete show={state === "confirm-delete"} onCanceled={onCanceled} onConfirmed={onDelete} />
      <SavingAlert show={state === "start-delete"}>{terms.startDelete}</SavingAlert>
      <SavedAlert show={state === "completed-delete"} onClosed={onClosed}>{terms.completedDelete}</SavedAlert>
      <TakeOffline show={state === "confirm-take-offline"} onCanceled={onCanceled} onConfirmed={onTakeOffline} />
      <SavingAlert show={state === "start-take-offline"}>{terms.startTakeOffline}</SavingAlert>
      <SavedAlert show={state === "completed-take-offline"} onClosed={onClosed}>{terms.completedTakeOffline}</SavedAlert>
      <Publish show={state === "confirm-publish"} onCanceled={onCanceled} onConfirmed={onPublish} />
      <SavingAlert show={state === "start-publish"}>{terms.startPublish}</SavingAlert>
      <SavedAlert show={state === "completed-publish"} onClosed={onClosed}>{terms.completedPublish}</SavedAlert>
    </>
  )
}

const Delete = (props : { show: boolean, onConfirmed : () => void, onCanceled : () => void }) => {
  const { onConfirmed, onCanceled, show } = props;
  const terms = useLocalization(localization);
  return (
    <ConfirmDialog
      header={terms.confirmDeleteHeader}
      content={terms.confirmDeleteContent}
      buttonText={terms.confirmDeleteButton}
      onConfirmed={onConfirmed}
      onCanceled={onCanceled}
      variant="danger"
      show={show}
    />
  );
};

const TakeOffline = (props : { show: boolean, onConfirmed : () => void, onCanceled : () => void }) => {
  const { onConfirmed, show, onCanceled } = props;
  const terms = useLocalization(localization);
  return (
    <ConfirmDialog
      header={terms.confirmTakeOfflineHeader}
      content={terms.confirmTakeOfflineContent}
      buttonText={terms.confirmTakeOfflineButton}
      onConfirmed={onConfirmed}
      onCanceled={onCanceled}
      variant="primary"
      show={show}
    />
  );
};

const Publish = (props : { show: boolean, onConfirmed : () => void, onCanceled : () => void }) => {
  const { onConfirmed, onCanceled, show } = props;
  const terms = useLocalization(localization);
  return (
    <ConfirmDialog
      header={terms.confirmPublishHeader}
      content={terms.confirmPublishContent}
      buttonText={terms.confirmPublishButton}
      onConfirmed={onConfirmed}
      onCanceled={onCanceled}
      variant="primary"
      show={show}
    />
  );
};
