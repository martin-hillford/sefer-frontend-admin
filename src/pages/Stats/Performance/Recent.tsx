import { TimeLineChartPanel } from 'components';
import { useMemo } from 'react';
import { useFetchStatistics } from 'hooks/useFetchStatistics';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Recent {
    date: string,
    value: number
}

export const Recent = () => {
  const data = useData();
  const terms = useLocalization(localization);
  return (
    <TimeLineChartPanel
      type="bar"
      xAxis="time"
      data={data}
      color="orange"
      title={terms.processingTimeLast48}
    />
  );
};


const processData = (raw: Recent[] | null | undefined) => {
  if (!raw) return raw;
  const data = raw.map(item => ({ interval: item.date, quantity: item.value }));
  return { data };
};

const useData = () => {
  const data = useFetchStatistics<Recent[]>('/processing-time?hours=48');
  return useMemo(() => processData(data), [data]);
};
