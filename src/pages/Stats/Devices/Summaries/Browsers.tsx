import { Loading, Panel } from 'sefer/components';
import CategoryItem from 'types/data/stats/CategoryItem';
import { useFetchStatistics } from 'hooks/useFetchStatistics';
import processData from './processData';
import { DonutChart } from 'components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export default () => {
  const terms = useLocalization(localization);
  const browsers = useFetchStatistics<CategoryItem[]>('/browsers');
  return (
    <Panel title={terms.browsers}>
      <Chart data={browsers} />
    </Panel>
  );
};

const Chart = (props: { data: CategoryItem[] | undefined | null }) => {
  const { data } = props;
  if (!data) return <Loading variant="medium" />;
  const chartData = processData(data);
  return <DonutChart data={chartData} />;
};
