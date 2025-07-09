import { User } from 'sefer/icons';
import { TimeLineChartPanel } from 'components';
import { Colors } from 'sefer/types/Colors';
import { Range } from 'types/ui/Range';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { useFetchHistogram } from 'hooks/useFetchHistogram';

export const NewStudentsChart = (props : {range : Range}) => {
  const { range } = props;
  const terms = useLocalization(localization);
  const data = useFetchHistogram(`/stats/new-students`, range);

  return (
    <TimeLineChartPanel
      icon={<User size={20} />}
      title={terms.newStudents}
      data={data}
      color={Colors.Orange}
    />
  );
};
