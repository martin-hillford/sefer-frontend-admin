import { Alert, Overlay } from 'sefer/components';

export const LessonSaveFailed = (props : { content: string, onClose : () => void}) => {
  const { onClose, content } = props;
  return (
    <Overlay>
      <Alert variant="danger" hide="auto" closable timeout={2000} onClosed={onClose}>
        {content}
      </Alert>
    </Overlay>
  );
};
