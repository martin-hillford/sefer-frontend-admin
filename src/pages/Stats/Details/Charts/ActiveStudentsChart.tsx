import { User } from 'sefer/icons';
import { TimeLineChartPanel } from 'components';
import { Range } from 'types/ui/Range';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { useFetchHistogram } from 'hooks/useFetchHistogram';
import { Colors } from 'sefer/types/Colors';

export const ActiveStudentsChart = (props : {range : Range}) => {
  const { range } = props;
  const data = useFetchHistogram('/stats/active-students', range);
  const terms = useLocalization(localization);
  return (
    <TimeLineChartPanel
      icon={<User size={20} />}
      title={terms.activeStudents}
      data={data}
      color={Colors.Blue}
    />
  );
};
