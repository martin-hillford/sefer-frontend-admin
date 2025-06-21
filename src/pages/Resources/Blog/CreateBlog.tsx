import { Container, Header, JumbotronLayout } from 'sefer/components';
import { Grid } from 'sefer/icons';
import { useUserContext } from 'context/UserContext';
import { BlogForm } from './BlogForm';
import { useCreateBlog } from './useCreateBlog';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

const CreateBlog = () => {
  const { user } = useUserContext();
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.blogs, link: '/content/blogs' },
    { label: terms.blogAdd },
  ];

  const blog = useCreateBlog(user);
  return (
    <JumbotronLayout overflow="auto" icon={<Grid size={13} />} title={terms.blogs} subTitle={terms.newsAndBackgrounds} crumbs={crumbs}>
      <Container>
        <Header inline={false} variant="large">{terms.blogAdd}</Header>
        <BlogForm blog={blog} />
      </Container>
    </JumbotronLayout>
  );
};

export default CreateBlog;
