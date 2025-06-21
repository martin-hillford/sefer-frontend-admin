import { Grid } from 'sefer/icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from 'types/data/resources/Blog';
import { getStartRange } from 'util/range';
import { Stats } from './Stats';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { BaseLayout, DateRangeSelector } from 'sefer/components';
import { useGet } from 'sefer-fetch';

export default () => {
  const { id } = useParams<{ id : string | undefined }>();
  return <Blogs id={id} />;
};

const Blogs = ({ id } : { id : string | undefined }) => {
  const [range, setRange] = useState(getStartRange());
  const blog = useGet<Blog>(`/admin/content/blogs/${id}`);
  const crumbs = useCrumbs(id, blog);
  const terms = useLocalization(localization);
  const startYear = blog?.creationDate ? new Date(blog.creationDate).getFullYear() : null;

  return (
    <BaseLayout icon={<Grid size={13} />} {...terms} crumbs={crumbs}>
      <DateRangeSelector range={range} setRange={setRange} startYear={startYear} />
      <Stats start={range.start} end={range.end} blog={id ? blog : null} />
    </BaseLayout>
  );
};

const useCrumbs = (id : string | undefined, blog: Blog | undefined | null) => {
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.blogs, link: '/content/blogs' }] as BreadCrumb[];
  if (id && !blog) crumbs.push({ label: terms.loading });
  if (id && blog) crumbs.push({ label: `${terms.blog}: ${blog.name}`, link: '/content/blogs' });
  crumbs.push({ label: terms.visitors });
  return crumbs;
};
