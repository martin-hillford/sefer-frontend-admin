import { PageType } from 'types/data/resources/PageType';

export const useCreatePage = (type : PageType) => ({
  isPublished: false,
  name: '',
  permalink: '',
  id: -1,
  content: '',
  sequenceId: -1,
  isHtmlContent: false,
  type
});