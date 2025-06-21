import { ResponseError } from 'util/errors';
import { PageWithContent } from 'types/data/resources/PageWithContent';
import { usePost } from 'sefer-fetch';

export const usePostMenuSequence = () => {
  const post = usePost<PageWithContent>();
  return async (pages: number[]) => {
    const { code, body } = await post('/admin/content/pages/sorting', pages);
    if (code !== 204 || body === null) throw new ResponseError(code, 'Could not post the sequence of the menu page to the server.');
    return body as PageWithContent;
  };
}
