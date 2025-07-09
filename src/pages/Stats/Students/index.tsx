import { BaseLayout, DataGrid, DateRangeSelector } from 'sefer/components';
import { User } from 'sefer/icons';
import { useState } from 'react';
import { getStartRange } from 'util/range';
import { GenderChart } from './GenderChart';
import { Stats } from './Stats';
import { TimeStats } from './TimeStats';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const [range, setRange] = useState(getStartRange());
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.users , link: '/users' },
    { label: terms.students, link: '/users/students' },
    { label: terms.statistics }
  ] as BreadCrumb[];

  const left = (
    <>
      <Stats />
      <TimeStats start={range.start} end={range.end} />
    </>
  );

  return (
    <BaseLayout icon={<User size={13} />} {...terms} crumbs={crumbs}>
      <DateRangeSelector range={range} setRange={setRange} />
      <DataGrid
        left={left}
        right={<GenderChart range={range} />}
      />
    </BaseLayout>
  );
};
