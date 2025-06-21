import { BlogWithContent } from 'types/data/resources/BlogWithContent';
import { ResponseError } from 'util/errors';
import { usePost, usePut } from 'sefer-fetch';
import { useBlogWithContentContext } from './useBlogWithContentContext';

export const useSaveBlog = (blog : BlogWithContent) => {
  const context = useBlogWithContentContext(blog);
  const put = usePutBlog();
  const post = usePostBlog();

  const save = async () => {
    const method = context.data.id === -1 ? post :put;
    const updated = await method( { ...context.data, isHtmlContent: false });
    context.set(updated);
    context.resetHasChanges();
  };

  return { context, save };
};

const usePostBlog = () => {
  const post = usePost<BlogWithContent>();
  return async (blog: BlogWithContent) => {
    const { code, body } = await post('/admin/content/blogs', blog);
    if (code !== 201) throw new ResponseError(code, 'Could not post the blog to the server.');
    return body as BlogWithContent;
  };
}

const usePutBlog = () => {
  const put = usePut<BlogWithContent>();
  return async (blog: BlogWithContent) => {
    const { code } = await put(`/admin/content/blogs/${blog.id}`, blog);
    if (code !== 200) throw new ResponseError(code, 'Could not put the blog to the server.');
    return blog;
  };
}

