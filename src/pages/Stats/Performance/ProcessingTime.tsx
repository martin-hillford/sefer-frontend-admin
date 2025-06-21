import { Panel } from 'sefer/components';
import { BarChart } from 'components';
import { Stats } from 'sefer/icons';
import { useMemo } from 'react';
import { Colors } from 'sefer/types/Colors';
import { useFetchStatistics } from 'hooks/useFetchStatistics';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface ProcessingTime {
    bin: number,
    processingTime: number,
    count: number
}

export const ProcessingTime = () => {
  const data = useData();
  const terms = useLocalization(localization);

  return (
    <Panel icon={<Stats size={20} />} title={terms.processingTime}>
      <BarChart
        height={300}
        unit={terms.seconds}
        name={terms.calls}
        data={data}
        color={Colors.Green}
      />
    </Panel>
  );
};

const processData = (data: ProcessingTime[] | null | undefined) => {
  if (!data) return data;
  return data?.map(item => ({ key: item.processingTime, value: item.count }));
};

const useData = () => {
  const data = useFetchStatistics<ProcessingTime[]>('/processing-time/histogram');
  return useMemo(() => processData(data), [data]);
};
