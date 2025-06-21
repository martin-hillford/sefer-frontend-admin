import { Page } from 'types/data/resources/Page';
import { useGetWithRefresh } from 'sefer-fetch';

export const useFetchPages = () => {
  const state = useGetWithRefresh<Page[]>('/admin/content/pages/links');
  if (state[0] === null) throw new Error('Could not fetch the pages');
  return state as [Page[] | undefined, () => void, (value: Page[]) => void];
};
