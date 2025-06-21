import { BaseLayout, DataGrid } from 'sefer/components';
import { Stats as StatsIcon } from 'sefer/icons';
import { Histograms } from './Histograms';
import { useStats } from './hooks';
import { InfoBoxGrid } from './InfoBoxGrid';
import Stats from './Stats';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';

const Dashboard = () => {
  const { data, version, stats, bounce } = useStats();
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.title }];
  return (
    <BaseLayout icon={<StatsIcon size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      <InfoBoxGrid data={data} />
      <DataGrid
        left={<Histograms data={data} />}
        right={<Stats data={stats} bounce={bounce} version={version} />}
      />
    </BaseLayout>
  );
};

export default Dashboard;
