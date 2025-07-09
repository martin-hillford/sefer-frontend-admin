import { Alert, Overlay } from 'sefer/components';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const CourseSaved = (props : { content : string}) => {
  const [closed, setClosed] = useState(false);
  const { content } = props;

  if (closed) return <Navigate to="/courses" />;
  return (
    <Overlay>
      <Alert variant="success" hide="auto" closable timeout={2500} onClosed={() => setClosed(true)}>
        {content}
      </Alert>
    </Overlay>
  );
};
