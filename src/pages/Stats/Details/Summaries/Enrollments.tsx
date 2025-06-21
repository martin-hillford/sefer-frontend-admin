import { Loading, Panel } from 'sefer/components';
import { EnrollmentsStatsData as Data } from 'types/data/EnrollmentsStatsData';
import { Range } from 'types/ui/Range';
import { DonutChart } from 'components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { useGetEnrollmentStats } from 'hooks/useGetEnrollmentStats';

export const Enrollments = (props : {range : Range}) => {
  const { range } = props;
  const summary = useGetEnrollmentStats(range.start, range.end);
  const terms = useLocalization(localization);
  return (
    <>
      <Panel title={terms.courseEnrollments}>
        <EnrollmentsChart data={summary} />
      </Panel>
      <Panel title={terms.enrollmentNotCompleted}>
        <ClosedEnrollmentsChart data={summary} />
      </Panel>
      <Panel title={terms.maleOrFemale}>
        <GenderChart data={summary} />
      </Panel>
    </>
  );
};

const EnrollmentsChart = (props : { data : Data | null | undefined}) => {
  const { data } = props;
  if (!data) return <Loading variant="medium" />;
  const terms = useLocalization(localization);
  const chartData = [
    { name: terms.completed, value: data.completed },
    { name: terms.open, value: data.open },
    { name: terms.canceled, value: data.closed }
  ];
  return <DonutChart data={chartData} />;
};

const ClosedEnrollmentsChart = (props : { data : Data | null | undefined}) => {
  const { data } = props;
  if (!data) return <Loading variant="medium" />;
  const terms = useLocalization(localization);
  const chartData = [
    { name: terms.open  , value: data.completed },
    { name: terms.canceled, value: data.closed }
  ];
  return <DonutChart data={chartData} />;
};

const GenderChart = (props : { data : Data | null | undefined}) => {
  const { data } = props;
  if (!data) return <Loading variant="medium" />;
  const terms = useLocalization(localization);
  const chartData = [
    { name: terms.male, value: data.males },
    { name: terms.female, value: data.females }
  ];
  return <DonutChart data={chartData} />;
};

