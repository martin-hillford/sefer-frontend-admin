import { Alert } from 'sefer/components';

export const Saving = (props : { content: string }) => (
  <Alert overlay hide={false} closable={false} variant="primary">
    {props.content}
  </Alert>
);

export const Saved = (props : { onClosed : () => void, content: string }) => {
  const { content, onClosed } = props;
  return (
    <Alert overlay closable onClosed={onClosed} variant="success">
      {content}
    </Alert>
  );
};
