import { useNavigate } from 'react-router-dom';

export const Fallback = () => {
  const navigate = useNavigate();
  navigate('/curricula');
  return null;
};