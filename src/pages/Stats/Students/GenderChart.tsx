import { DonutChart } from 'components';
import { EnrollmentsStatsData as Data } from 'types/data/EnrollmentsStatsData';
import { Range } from 'types/ui/Range';
import { Loading, Panel } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useGetEnrollmentStats } from 'hooks/useGetEnrollmentStats';

export const GenderChart = (props : {range : Range}) => {
  const { range } = props;
  const terms = useLocalization(localization);
  const summary = useGetEnrollmentStats(range.start, range.end);
  return (
    <Panel title={terms.maleOrFemaleDistribution}>
      <Chart data={summary} />
    </Panel>
  );
};

const Chart = (props : { data : Data | null | undefined}) => {
  const { data } = props;
  if (!data) return <Loading variant="medium" />;
  const terms = useLocalization(localization);
  const chartData = [
    { name: terms.male, value: data.males },
    { name: terms.female, value: data.females }
  ];
  return <DonutChart data={chartData} />;
};
