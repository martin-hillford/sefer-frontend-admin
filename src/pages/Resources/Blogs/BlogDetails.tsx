import { Boolean, DateTimeLabel, Property } from 'sefer/components';
import { useAdminFrontendConfig } from 'hooks/useAdminFrontendConfig';
import { Blog } from 'types/data/resources/Blog';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const BlogDetails = ({ blog } : {blog : Blog | undefined}) => {
  const config = useAdminFrontendConfig();
  const terms = useLocalization(localization);

  if (!blog) return null;
  return (
    <>
      <Property label={terms.title}>{blog.name}</Property>
      <Property label={terms.permalink}>
        <a target="_blank" rel="noreferrer" href={`${config?.publicSite}/blogs/${blog.permalink}`}>{blog.permalink}</a>
      </Property>
      <Property label={terms.author}>{blog.author.name}</Property>
      <Property label={terms.published}>
        <Boolean size={24} value={blog.isPublished} />
      </Property>
      <Property label={terms.publicationDate}>
        <DateTimeLabel value={blog.publicationDate} empty="-" />
      </Property>
      <Property label={terms.creationDate}>
        <DateTimeLabel value={blog.creationDate} empty="-" />
      </Property>
      <Property label={terms.lastModified}>
        <DateTimeLabel value={blog.modificationDate} empty="-" />
      </Property>
      <Property label={terms.convertedToMarkdown}>
        <Boolean size={24} value={!blog.isHtmlContent} />
      </Property>
    </>
  );
};
