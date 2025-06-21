import { JumbotronLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { Series } from 'types/data/series/Series';
import { Form } from './Form';
import { useSeries } from './useSeries';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Main = (props : { seriesId?: number }) => {
  const { seriesId } = props;
  const { series, save } = useSeries(seriesId);
  const terms = useLocalization(localization);

  const crumbs = useCrumbs(series?.data);

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.education} subTitle={terms.courseManagement} crumbs={crumbs}>
      { !series?.data && <Loading variant="large" /> }
      { series?.data && <Form context={series} save={save} /> }
    </JumbotronLayout>
  );
};

const useCrumbs = (series?: Series) => {
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.seriesList, link: '/series' } as { label: string, link?: string}];
  const seriesName = terms.seriesName.replace("@name", series?.name ?? '');

  if (!series) crumbs.push({ label: terms.seriesLoading });
  else if (series.id === -1) crumbs.push({ label: terms.addSeries });
  else crumbs.push({ label: seriesName });

  return crumbs;
};
