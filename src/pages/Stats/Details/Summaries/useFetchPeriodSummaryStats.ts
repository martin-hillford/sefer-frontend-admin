import { getBinSize } from 'util/binsize';
import { useGet } from 'sefer-fetch';
import { PeriodSummary } from 'types/data/PeriodSummary';

export const useFetchPeriodSummaryStats = (range: { start: number, end: number }) => {
  const { start, end } = range;
  const { lower, upper, bins } = getBinSize(start, end);
  const summary = useGet<PeriodSummary>(`/stats/period-summary?lower=${lower}&upper=${upper}&bin=${bins}`);
  if(summary === null) throw new Error('Could not fetch the period summary stats');
  return summary;
}
