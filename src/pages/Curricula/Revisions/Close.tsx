import { Bold, Button, ConfirmDialog, SavedAlert, SavingAlert } from 'sefer/components';
import { RevisionProps } from './RevisionProps';
import { useState } from 'react';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Close = (props: RevisionProps) => {
  const [ state, setState ] = useState<string>("initial");
  const terms = useLocalization(localization);
  const { close, refresh } = props;

  const onConfirm = () => setState("confirm");
  const onClosed = () => setState("initial");

  const onConfirmed = async () => {
    setState("closing");
    const result = await close();
    setState(result ? "closed" : "failed");
    if (result) refresh();
  };

  return (
    <>
      <Button onClick={onConfirm}>{terms.closeButton}</Button>
      <ConfirmCloseDialog show={state === "confirm"} onConfirmed={onConfirmed} onCanceled={onClosed} />
      <Closing show={state === "closing"} content={terms.closing} />
      <Closed show={state === "closed"} content={terms.closed} onClosed={onClosed} />
      <ClosingFailed show={state === "failed"} content={terms.closingFailed} onClosed={onClosed} />
    </>
  )
};

const ConfirmCloseDialog = (props: { show : boolean, onCanceled: () => void, onConfirmed: () => void }) => {
  const { onCanceled, onConfirmed, show } = props;
  const terms = useLocalization(localization);
  return (
    <ConfirmDialog
      show={show}
      buttonText={terms.closeButton}
      header={terms.closeHeader}
      content={(
        <>
          <span>{terms.closeQuestion}</span><br />
          <Bold>{terms.closeWarning}</Bold><br /><br />
        </>
      )}
      onCanceled={onCanceled}
      onConfirmed={onConfirmed}
    />
  );
};

const Closing = (props: { show: boolean, content: string}) =>
  <SavingAlert show={props.show} content={props.content} />;

const Closed = (props: {  show: boolean, content: string, onClosed: () => void }) => (
  <SavedAlert
    show={props.show}
    content={props.content}
    onClosed={props.onClosed}
  />
);

const ClosingFailed = (props: {  show: boolean, content: string, onClosed: () => void }) => (
  <SavedAlert
    variant="danger"
    show={props.show}
    content={props.content}
    onClosed={props.onClosed}
  />
);
