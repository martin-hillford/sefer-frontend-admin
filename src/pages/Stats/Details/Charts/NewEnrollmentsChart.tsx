import { Education } from 'sefer/icons';
import { TimeLineChartPanel } from 'components';
import { Colors } from 'sefer/types/Colors';
import { Range } from 'types/ui/Range';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { useFetchHistogram } from 'hooks/useFetchHistogram';

export const NewEnrollmentsChart = (props : {range : Range}) => {
  const { range } = props;
  const terms = useLocalization(localization);
  const data = useFetchHistogram('/stats/new-enrollments', range);
  return (
    <TimeLineChartPanel
      icon={<Education size={20} />}
      title={terms.newEnrollments}
      data={data}
      color={Colors.Red}
    />
  );
};
