import { useGet } from 'sefer-fetch';
import { DashboardStats } from 'types/data/stats/DashboardStats';

export const useGetDashboardStats = () => {
  const offset = new Date().getTimezoneOffset();
  const stats = useGet<DashboardStats>(`/stats/dashboard?timezone=${offset}`);
  if(stats === null) throw new Error('Could not fetch the admin dashboard stats');
  return stats;
}

