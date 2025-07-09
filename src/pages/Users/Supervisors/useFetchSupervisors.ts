import { Supervisor } from 'types/data/users/Supervisor';
import { processUsers } from 'util/processUsers';
import { useGetWithState } from 'sefer-fetch';

export const useFetchSupervisors = () => {
  const [ supervisors, setSupervisors ] = useGetWithState<Supervisor[]>('/users/supervisors');
  if(supervisors === null) throw new Error('Could not load the supervisors information from the server, please contact the developer.');
  return { supervisors: processUsers(supervisors), setSupervisors };
};
