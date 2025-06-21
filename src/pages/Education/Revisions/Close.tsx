import { Alert, ConfirmDialog as Confirm, Flex, Loading, Overlay } from 'sefer/components';
import { useState } from 'react';
import { setWait } from 'util/setWait';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePostCloseRevision } from './usePostCloseRevision';

type CloseProps = {
  onClosed : () => void,
  onCanceled : () => void,
  revisionId : number | undefined
  show: boolean;
}

export const Close = (props : CloseProps) => {
  const { onClosed, onCanceled, revisionId, show } = props;
  const [state, setState] = useState('confirm');
  const terms = useLocalization(localization).closeDialog;
  const postCloseRevision = usePostCloseRevision();

  if(!show) return null;

  const close = async () => {
    const process = async () => {
      setState('saving');
      const saved = await postCloseRevision(revisionId)
      return saved ? 'closed' : 'failed';
    };
    await setWait(process, setState);
  };

  const onClose = (stateValue : string) => {
    setState('default');
    if (stateValue === 'closed') onClosed();
    else onCanceled();
  };

  switch (state) {
    case 'confirm': return <ConfirmDialog onCanceled={onCanceled} onConfirmed={close} />;
    case 'saving': return <Saving content={terms.saving} />;
    case 'closed': return <Closed content={terms.closed} onClosed={() => onClose('closed')} />;
    case 'failed': return <Failed content={terms.failed} onClosed={() => onClose('failed')} />;
    default: return null;
  }
};

const ConfirmDialog = (props : { onConfirmed : () => void, onCanceled : () => void }) => {
  const { onConfirmed, onCanceled } = props;
  const terms = useLocalization(localization).closeDialog;
  return (
    <Confirm
      header={terms.header}
      buttonText={terms.buttonText}
      content={terms.content}
      onCanceled={onCanceled}
      onConfirmed={onConfirmed}
    />
  );
};

const Saving = (props : { content: string}) => (
  <Overlay>
    <Alert variant="primary" hide={false} closable={false}>
      <Flex $align>
        <div><Loading variant="extra-small" /></div>
        <div>&nbsp;{props.content}</div>
      </Flex>
    </Alert>
  </Overlay>
);

const Failed = (props : { onClosed : () => void, content: string }) => {
  const { onClosed, content } = props;
  return (
    <Overlay>
      <Alert variant="danger" closable onClosed={onClosed}>
        {content}
      </Alert>
    </Overlay>
  );
};

const Closed = (props : { onClosed : () => void, content: string }) => {
  const { onClosed, content } = props;
  return (
    <Overlay>
      <Alert variant="success" closable onClosed={onClosed}>
        {content}
      </Alert>
    </Overlay>
  );
};
