import { User } from 'sefer/icons';
import { TimeLineChartPanel } from 'components';
import { FC } from 'react';
import { Colors } from 'sefer/types/Colors';
import { useFetchCourseVisits } from './useFetchCourseVisits';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const TimeStats : FC<{ start: number, end: number }> = (props) => {
  const { start, end } = props;
  const visitors = useFetchCourseVisits(start, end);
  const terms = useLocalization(localization);

  return (
    <TimeLineChartPanel
      icon={<User size={20} />}
      title={terms.visitors}
      data={visitors}
      color={Colors.Purple}
    />
  );
};
