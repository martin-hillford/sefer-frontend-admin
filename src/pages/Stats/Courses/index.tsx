import { Education } from 'sefer/icons';
import { BaseLayout, DateRangeSelector } from 'sefer/components';
import { useState } from 'react';
import { getStartRange } from 'util/range';
import { TimeStats } from './TimeStats';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { ProductionStats } from './ProductionStats';

const Students = () => {
  const [range, setRange] = useState(getStartRange());
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.courses, link: '/courses' },
    { label: terms.statistics }
  ];

  return (
    <BaseLayout icon={<Education size={13} />} {...terms} crumbs={crumbs}>
      <DateRangeSelector range={range} setRange={setRange} />
      <TimeStats start={range.start} end={range.end} />
      <ProductionStats />
    </BaseLayout>
  );
};

export default Students;
