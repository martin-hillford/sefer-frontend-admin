import { Education } from 'sefer/icons';
import { TimeLineChartPanel } from 'components';
import { Colors } from 'sefer/types/Colors';
import { Range } from 'types/ui/Range';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { useFetchHistogram } from 'hooks/useFetchHistogram';

export const SubmittedLessonsChart = (props : {range : Range}) => {
  const { range } = props;
  const terms = useLocalization(localization);
  const data = useFetchHistogram(`/stats/submitted-lessons`, range);

  return (
    <TimeLineChartPanel
      icon={<Education size={20} />}
      title={terms.submittedLessons}
      data={data}
      color={Colors.Green}
    />
  );
};
