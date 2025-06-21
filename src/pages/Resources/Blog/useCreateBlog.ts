import { UserBase } from 'types/data/users/UserBase';

export const useCreateBlog = (user? : UserBase) => ({
  authorId: user?.id as number,
  creationDate: new Date(),
  authorName: user?.name as string,
  isPublished: false,
  modificationDate: null,
  name: '',
  permalink: '',
  publicationDate: null,
  id: -1,
  content: '',
  isHtmlContent: false
});
