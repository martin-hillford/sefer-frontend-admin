import { User } from 'sefer/icons';
import { BaseLayout } from 'sefer/components';
import { ProcessingTime } from './ProcessingTime';
import { ProcessingTimeWeekly } from './ProcessingTimeWeekly';
import { Recent } from './Recent';
import { RequestsPerHourOfWeek } from './RequestsPerHourOfWeek';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.dashboard, link: '/' },
    { label: terms.statistics },
    { label: terms.performance },
  ] as BreadCrumb[];

  return (
    <BaseLayout icon={<User size={13} />} {...terms} crumbs={crumbs}>
      <ProcessingTime />
      <ProcessingTimeWeekly />
      <Recent />
      <RequestsPerHourOfWeek />
    </BaseLayout>
  );
};
