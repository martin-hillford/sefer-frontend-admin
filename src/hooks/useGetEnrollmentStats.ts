import { EnrollmentsStatsData as Data } from 'types/data/EnrollmentsStatsData';
import { getBinSize } from 'util/binsize';
import { useGet } from 'sefer-fetch';

export const useGetEnrollmentStats = (start : number, end : number) => {
  const { lower, upper, bins } = getBinSize(start, end);
  return useGet<Data>(`/stats/enrollments?lower=${lower}&upper=${upper}&bin=${bins}`)
}
