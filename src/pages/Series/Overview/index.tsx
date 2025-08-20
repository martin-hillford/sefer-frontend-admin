import { JumbotronLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { Entities } from './Entities';
import { useSeries } from './useSeries';
import { Series } from 'types/data/series/Series';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { NoSeries } from './NoSeries';

export default () => {
  const { series, refresh, onDelete, onChange, saveSequence } = useSeries();
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.seriesLabel }];

  const save = async (data: Series[]) => { await saveSequence(data); }

  if(series?.length === 0) return <NoSeries />
  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.education} subTitle={terms.courseManagement} crumbs={crumbs}>
      { !series && <Loading variant="large" /> }
      <Entities
        series={series} refresh={refresh}
        onDelete={onDelete}
        onChange={onChange}
        saveSequence={save}
      />
    </JumbotronLayout>
  );
};
