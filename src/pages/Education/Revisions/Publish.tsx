import { Alert, ConfirmDialog as Confirm, Flex, Loading, Overlay } from 'sefer/components';
import { useState } from 'react';
import { setWait } from 'util/setWait';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePublishRevision } from './usePublishRevision';

type PublishProps = {
  onPublished : () => void,
  onCanceled : () => void,
  revisionId : number
  show: boolean
}

export const Publish = (props : PublishProps) => {
  const [state, setState] = useState('confirm');
  const { revisionId, onPublished, onCanceled, show } = props;
  const terms = useLocalization(localization).publishDialog;
  const publishRevision = usePublishRevision()

  if(!show) return null;

  const publish = async () => {
    const process = async () => {
      setState('saving');
      const saved = await publishRevision(revisionId);
      return saved ? 'published' : 'failed';
    };
    await setWait(process, setState);
  };

  const onClose = (res : string) => {
    setState('close');
    if (res === 'published') onPublished();
    else onCanceled();
  };

  switch (state) {
    case 'confirm': return <ConfirmDialog onCanceled={onCanceled} onConfirmed={publish} />;
    case 'saving': return <Saving content={terms.saving} />;
    case 'published': return <Published content={terms.saved} onClosed={() => onClose('published')} />;
    case 'failed': return <Failed onClosed={() => onClose('failed')} content={terms.failed}  />;
    default: return null;
  }
};

const ConfirmDialog = (props : { onConfirmed : () => void, onCanceled : () => void }) => {
  const { onCanceled, onConfirmed } = props;
  const terms = useLocalization(localization).publishDialog;
  return (
    <Confirm
      header={terms.header}
      buttonText={terms.buttonText}
      content={<ConfirmDialogContent content={terms.content} />}
      onCanceled={onCanceled}
      onConfirmed={onConfirmed}
    />
  );
};

const ConfirmDialogContent = (props : { content: string[]}) => (
  <div>
    <span>{props.content[0]}</span><br />
    <span>{props.content[1]}</span><br />
    <br />
    <span><em>{props.content[2]}</em></span>
  </div>
);

const Saving = (props : { content: string }) => (
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
  const { onClosed } = props;
  return (
    <Overlay>
      <Alert variant="danger" closable onClosed={onClosed}>
        {props.content}
      </Alert>
    </Overlay>
  );
};

const Published = (props : { onClosed : () => void, content: string }) => {
  const { onClosed, content } = props;
  return (
    <Overlay>
      <Alert variant="success" closable onClosed={onClosed}>
        {content}
      </Alert>
    </Overlay>
  );
};
