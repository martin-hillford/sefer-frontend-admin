import { Student } from '../types/data/users/Student';
import { processUsers } from 'util/processUsers';
import { useGetWithRefresh } from 'sefer-fetch';

export const useFetchStudents = () => {
  const [ students, refresh, setStudents ] = useGetWithRefresh<Student[]>('/users/students');
  if(students === null) throw new Error('Could not load the student information from the server, please contact the developer.');
  return { students: processUsers(students), refresh, setStudents }
}
