import { Alert, Overlay, ProgressBar } from 'sefer/components';

export const CourseSaving = (props : { content: string, progress : number}) => {
  const { content, progress } = props;
  return (
    <Overlay>
      <Alert variant="primary" hide={false} closable={false}>
        <div>{content}</div>
        <ProgressBar progress={progress} variant="primary" />
      </Alert>
    </Overlay>
  );
};
