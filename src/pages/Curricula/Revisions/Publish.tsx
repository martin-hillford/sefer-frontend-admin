import { Bold, Button, ConfirmDialog, Italic, SavedAlert, SavingAlert } from 'sefer/components';
import { RevisionProps } from './RevisionProps';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useState } from 'react';

export const Publish = (props : RevisionProps) => {
  const { publish, refresh } = props;
  const [ state, setState ] = useState<string>("initial");
  const terms = useLocalization(localization);

  const onConfirm = () => setState("confirm");
  const onClosed = () => setState("initial");

  const onConfirmed = async () => {
    setState("publishing");
    const result = await publish();
    setState(result ? "published" : "failed");
    if (result) refresh();
  };

  return (
    <>
      <Button onClick={onConfirm}>{terms.publishButton}</Button>
      <ConfirmPublishDialog show={state === "confirm"} onConfirmed={onConfirmed} onCanceled={onClosed} />
      <Publishing show={state === "publishing"} content={terms.publishing} />
      <Published show={state === "published"} onClosed={onClosed} />
      <PublishingFailed show={state === "failed"} onClosed={onClosed} />
    </>
  );
};

const ConfirmPublishDialog = (props : { show:boolean, onCanceled : () => void, onConfirmed : () => void}) => {
  const terms = useLocalization(localization);
  const { onCanceled, show, onConfirmed } = props;
  return (
    <ConfirmDialog
      show={show}
      buttonText={terms.publishButton}
      header={terms.publishDialogHeader}
      content={(
        <>
          <span>{terms.publishDialogContent}</span><br />
          <Bold>{terms.publishDialogVisibleWarning}</Bold><br /><br />
          <Italic>{terms.publishDialogNote}</Italic>
        </>
      )}
      onCanceled={onCanceled}
      onConfirmed={onConfirmed}
    />
  );
};

const Publishing = (props: {  show: boolean, content: string}) =>
  <SavingAlert show={props.show} content={props.content} />;

const Published = (props : { show: boolean, onClosed : () => void}) => {
  const terms = useLocalization(localization);
  const { onClosed, show } = props;
  return (
    <SavedAlert
      show={show}
      content={terms.published}
      onClosed={onClosed}
    />
  );
};

const PublishingFailed = (props : { show: boolean, onClosed : () => void}) => {
  const terms = useLocalization(localization);
  const { onClosed, show } = props;
  return (
    <SavedAlert
      show={show}
      variant="danger"
      content={terms.publishingFailed}
      onClosed={onClosed}
    />
  );
};
