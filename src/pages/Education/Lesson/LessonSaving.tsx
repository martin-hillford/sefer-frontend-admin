import { Alert, Overlay } from 'sefer/components';

export const LessonSaving = (props: { content: string}) => (
  <Overlay>
    <Alert variant="primary" hide={false} closable={false}>
      <div>{props.content}</div>
    </Alert>
  </Overlay>
);
