import { JumbotronLayout, Loading } from 'sefer/components';
import { IdParam } from 'components';
import { Education } from 'sefer/icons';
import { Series } from 'types/data/series/Series';
import { Courses } from './Courses';
import { useSeriesCourses } from './useSeriesCourses';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => <IdParam onId={id => <Main seriesId={id} />} fallback="/series" />;

const Main = (props: { seriesId: number}) => {
  const { seriesId } = props;
  const { series, save } = useSeriesCourses(seriesId);
  const terms = useLocalization(localization);

  const crumbs = useCrumbs(series);

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.education} subTitle={terms.subTitle} crumbs={crumbs}>
      { !series && <Loading variant="large" /> }
      { series && <Courses series={series} save={save} />}
    </JumbotronLayout>
  );
};

const useCrumbs = (series?: Series) => {
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.series, link: '/series' } as { label: string, link?: string}];
  const seriesName = terms.seriesName.replace("@name", series?.name ?? '');

  if (!series) crumbs.push({ label: terms.seriesLoading });
  else crumbs.push(
    { label: seriesName, link: `/series/${series.id}` },
    { label: terms.courses }
  );

  return crumbs;
};
