import { Container, JumbotronLayout, Loading } from 'sefer/components';
import { IdParam } from 'components';
import { Grid } from 'sefer/icons';
import { BlogWithContent } from 'types/data/resources/BlogWithContent';
import { htmlToText } from 'util/html';
import { BlogForm } from './BlogForm';
import { useEditBlog } from './useEditBlog';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

const EditBlog = () => <IdParam fallback="/content/blogs" onId={id => <LoadBlog id={id} />} />;

const LoadBlog = ({ id } : {id : number}) => {

  const blog = useEditBlog(id);
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.blogs, link: '/content/blogs' },
    { label: terms.blogEdit },
  ];

  return (
    <JumbotronLayout overflow="auto" icon={<Grid size={13} />} title={terms.blogs} subTitle={terms.newsAndBackgrounds} crumbs={crumbs}>
      {!blog && <Loading variant="huge" />}
      {blog && <Container><BlogForm blog={process(blog)} /></Container> }
    </JumbotronLayout>
  );
};

const process = (blog : BlogWithContent) => {

  if (blog.isHtmlContent) blog.content = htmlToText(blog.content);
  return blog;
};

export default EditBlog;
