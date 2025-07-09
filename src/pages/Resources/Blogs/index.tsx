import { EntitiesNotFound, JumbotronLayout, Loading } from 'sefer/components';
import { Grid } from 'sefer/icons';
import { Blog } from 'types/data/resources/Blog';
import { Content } from './Content';
import { useGetWithRefresh } from 'sefer-fetch';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const [blogs, refresh] = useGetWithRefresh<Blog[]>('/admin/content/blogs/base')
  const terms = useLocalization(localization);
  if (blogs === null) throw new Error('Could not fetch the blogs');

  const crumbs = [ { label: terms.blogs }, ];

  return (
    <JumbotronLayout icon={<Grid size={13} />} title={terms.blogs} subTitle={terms.newsAndBackgrounds} crumbs={crumbs}>
      <Panel refresh={refresh} blogs={blogs} />
    </JumbotronLayout>
  );
};

const Panel = (props : { blogs : Blog[] | undefined, refresh : () => void }) => {
  const terms = useLocalization(localization);
  const { blogs, refresh } = props;
  if (!blogs) return <Loading variant="huge" />;
  if (blogs.length === 0) return <EntitiesNotFound header={terms.blogs} content={terms.noBlogsFound} />;
  return <Content blogs={blogs} refresh={refresh} />;
};
