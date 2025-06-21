import { useFetchHistogram } from 'hooks/useFetchHistogram';
import { useGetBoundPercentage } from './useGetBoundPercentage';
import { useGetDashboardStats } from './useGetDashboardStats';
import { useGetVersionInfo } from 'hooks/useGetVersionInfo';

export const useStats = () => {
  const stats = useGetDashboardStats();
  const version = useGetVersionInfo();
  const students = useFetchHistogram('/stats/active-students');
  const submittedLessons = useFetchHistogram(`/stats/submitted-lessons`);
  const newStudents = useFetchHistogram(`/stats/new-students`);
  const newEnrollments = useFetchHistogram('/stats/new-enrollments');
  const bounce = useGetBoundPercentage();

  const data = { students, submittedLessons, newStudents, newEnrollments };
  return { data, stats, version, bounce };
};

