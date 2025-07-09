import { ResponseError } from 'util/errors';
import { useDelete } from 'sefer-fetch';

export const useDeleteBlog = () => {
  const del = useDelete();
  return async (blogId : number) => {
    const { code } = await del(`/admin/content/blogs/${blogId}`, {});
    if (code !== 204) throw new ResponseError(code, 'Could not deleted the blog');
  };
}
