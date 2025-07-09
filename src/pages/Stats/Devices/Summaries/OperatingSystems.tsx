import { DonutChart } from 'components';
import { Loading, Panel } from 'sefer/components';
import CategoryItem from 'types/data/stats/CategoryItem';
import { useFetchStatistics } from 'hooks/useFetchStatistics';
import processData from './processData';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export default () => {
  const operatingSystems = useFetchStatistics<CategoryItem[]>('/operating-systems');
  const terms = useLocalization(localization);
  return (
    <Panel title={terms.operatingSystems}>
      <Chart data={operatingSystems} />
    </Panel>
  );
};

const Chart = (props: { data: CategoryItem[] | undefined | null }) => {
  const { data } = props;
  if (!data) return <Loading variant="medium" />;
  const chartData = processData(data);
  return <DonutChart data={chartData} />;
};
