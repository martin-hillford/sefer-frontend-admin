import { User } from 'sefer/icons';
import { TimeLineChartPanel } from 'components';
import { Colors } from 'sefer/types/Colors';
import { useFetchHistogram } from 'hooks/useFetchHistogram';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const TimeStats = (props: { start: number, end: number }) => {
  const { start, end } = props;
  const terms = useLocalization(localization);
  const active = useFetchHistogram('/stats/active-students', { start, end });

  return (
    <TimeLineChartPanel
      icon={<User size={20} />}
      title={terms.activeStudents}
      data={active}
      color={Colors.Purple}
    />
  );
};
