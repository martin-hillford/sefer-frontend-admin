import { BaseLayout, DataGrid } from 'sefer/components';
import { Devices } from 'sefer/icons';
import Charts from './Charts';
import Summaries from './Summaries';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const terms = useLocalization(localization);
  const crumbs = [
    { label: terms.dashboard, link: '/' },
    { label: terms.statistics }
  ] as BreadCrumb[];

  return (
    <BaseLayout icon={<Devices size={13} />} {...terms} crumbs={crumbs}>
      <DataGrid
        left={<Charts />}
        right={<Summaries />}
      />
    </BaseLayout>
  );
};
