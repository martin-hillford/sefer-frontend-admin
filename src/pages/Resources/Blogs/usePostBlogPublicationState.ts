import { ResponseError } from 'util/errors';
import { usePut } from 'sefer-fetch';

export const usePostBlogPublicationState = () => {
  const put = usePut();
  return async (blogId: number, published: boolean) => {
    const method = published ? 'publish' : 'take-offline';
    const { code } = await put(`/admin/content/blogs/${blogId}/${method}`, {});
    if (code !== 200) throw new ResponseError(code, 'Could not change the publication sate the blog');
  };
}
