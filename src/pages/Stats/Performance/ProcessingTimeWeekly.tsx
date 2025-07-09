import { TimeLineChartPanel } from 'components';
import { useMemo } from 'react';
import { useFetchStatistics } from 'hooks/useFetchStatistics';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { Colors } from 'sefer/types/Colors';

interface Weekly {
    week: number,
    year: number,
    average: number,
    count: number
}

export const ProcessingTimeWeekly = () => {
  const data = useData();
  const terms = useLocalization(localization);
  return (
    <TimeLineChartPanel
      xAxis="category"
      data={data}
      color={Colors.Red}
      title={terms.processingTimePerWeek}
    />
  );
};


const processData = (raw: Weekly[] | null | undefined) => {
  if (!raw) return raw;
  const data = raw.map(item => ({
    interval: `${item.year}-${item.week}`,
    quantity: Math.round(item.average / 10) / 100,
  }));
  return { data };
};

const useData = () => {
  const data = useFetchStatistics<Weekly[]>('/processing-time/weekly');
  return useMemo(() => processData(data), [data]);
};

