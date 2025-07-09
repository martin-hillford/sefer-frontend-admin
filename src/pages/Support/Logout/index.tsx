import { Navigate } from 'react-router-dom';

export default () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('expires');

  return <Navigate to="/logon" />;
};
