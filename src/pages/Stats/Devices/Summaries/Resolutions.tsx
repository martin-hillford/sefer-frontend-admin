import { Loading, Panel } from 'sefer/components';
import { DonutChart } from 'components';
import { useFetchStatistics } from 'hooks/useFetchStatistics';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

interface Resolution {
    name: string;
    count: number;
    totalCount: number;
    percentage: number;
    minWidth?: null | number;
    maxWidth?: null | number;
}

export default () => {
  const resolutions = useFetchStatistics<Resolution[]>('/resolutions');
  const terms = useLocalization(localization);
  return (
    <Panel title={terms.screenSizes}>
      <Chart data={resolutions} />
    </Panel>
  );
};

const Chart = (props: { data: Resolution[] | undefined | null }) => {
  const { data } = props;
  if (!data) return <Loading variant="medium" />;
  const chartData = data.map(item => ({ ...item, value: Math.round(item.percentage * 100) / 100 }));
  return <DonutChart data={chartData} />;
};
