import { useGetWithState } from 'sefer-fetch';
import { Admin } from 'types/data/users/Admin';

export const useGetAdmins = () => useGetWithState<Admin[]>('/users/administrators')
