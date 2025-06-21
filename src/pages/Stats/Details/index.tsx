import { BaseLayout, DataGrid, DateRangeSelector } from 'sefer/components';
import { Stats as StatsIcon } from 'sefer/icons';
import { useState } from 'react';
import { getStartRange } from 'util/range';
import { Charts } from './Charts';
import { Summaries } from './Summaries';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const [range, setRange] = useState(getStartRange());
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.title, link: '/dashboard' },
    { label: terms.details }
  ];
  return (
    <BaseLayout icon={<StatsIcon size={13} />} {...terms} crumbs={crumbs}>
      <DateRangeSelector range={range} setRange={setRange} />
      <DataGrid
        left={<Charts range={range} />}
        right={<Summaries range={range} />}
      />
    </BaseLayout>
  );
};
