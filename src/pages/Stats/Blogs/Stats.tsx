import { Grid } from 'sefer/icons';
import { TimeLineChartPanel } from 'components';
import { Blog } from 'types/data/resources/Blog';
import { Colors } from 'sefer/types/Colors';
import { useFetchBlogVisitors } from './useFetchBlogVisitors';
import { Loading } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Stats = (props: { blog : Blog | undefined | null, start: number, end: number}) => {
  const { blog, start, end } = props;
  const visitors = useFetchBlogVisitors(start, end, blog?.permalink);
  const terms = useLocalization(localization);

  if(blog === undefined) return <Loading variant="medium" />
  return (
    <TimeLineChartPanel
      icon={<Grid size={20} />}
      title={terms.visitors}
      data={visitors}
      color={Colors.Blue}
    />
  );
};
