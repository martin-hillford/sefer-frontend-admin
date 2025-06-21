import { Stats as StatsIcon, User } from 'sefer/icons';
import { TimeLineChartPanel } from 'components';
import { useState } from 'react';
import { MentorPerformance } from 'types/data/MentorPerformance';
import { Colors } from 'sefer/types/Colors';
import { getStartRange } from 'util/range';
import { MentorTable } from './MentorTable';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useFetchHistogram } from 'hooks/useFetchHistogram';
import { useGet } from 'sefer-fetch';
import { BaseLayout, DateRangeSelector } from 'sefer/components';

export default () => {
  const [range, setRange] = useState(getStartRange());
  const terms = useLocalization(localization);

  const data = useFetchHistogram('/stats/active-mentors', range);
  const performance = useGet<MentorPerformance[]>('/users/mentor-performance')

  const crumbs = [
    { label: terms.dashboard, link: '/dashboard' },
    { label: terms.mentors }
  ];

  return (
    <BaseLayout icon={<StatsIcon size={13} />} {...terms} crumbs={crumbs}>
      <DateRangeSelector range={range} setRange={setRange} />
      <TimeLineChartPanel
        color={Colors.Blue}
        icon={<User size={20} />}
        title={terms.activeMentors}
        data={data}
      />
      <MentorTable data={performance} />
    </BaseLayout>
  );
};
