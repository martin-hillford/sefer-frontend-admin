import { Navigate, useParams } from 'react-router-dom';
import { ReactNode } from 'react';

type Props = {
  onId : (userId : number) => ReactNode
  fallback : string
}

export const IdParam = (props : Props) => {
  const { fallback, onId } = props;
  const { id } = useParams<{ id : string | undefined }>();
  if (!id) return <Navigate to={fallback} />;
  const parsed = parseInt(id);
  if (!parsed || Number.isNaN(parsed)) return <Navigate to={fallback} />;

  return onId(parsed);
};
