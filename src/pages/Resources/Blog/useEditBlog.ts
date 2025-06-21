import { BlogWithContent } from 'types/data/resources/BlogWithContent';
import { useGet } from 'sefer-fetch';
import { htmlToText } from 'util/html';

export const useEditBlog = (blogId : number) => {
  const blog = useGet<BlogWithContent>(`/admin/content/blogs/${blogId}`);
  if(blog === null) throw new Error( 'Could not fetch the request blog.');
  return process(blog);
};

const process = (blog? : BlogWithContent) => {
  if (blog?.isHtmlContent) blog.content = htmlToText(blog.content);
  return blog;
};
