import { useDelete } from 'sefer-fetch';
import { ResponseError } from 'util/errors';

export const useDeletePage = () => {
  const del = useDelete();
  return async (pageId : number) => {
    const { code } = await del(`/admin/content/pages/${pageId}`, {});
    if (code !== 204) throw new ResponseError(code, 'Could not deleted the page');
    return true;
  }
}
