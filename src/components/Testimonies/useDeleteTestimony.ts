import { useDelete } from 'sefer-fetch';
import { ResponseError } from 'util/errors';

export const useDeleteTestimony = () => {
  const del = useDelete();
  return async (testimonyId : number) => {
    const { code } = await del(`/testimonies/${testimonyId}`, {});
    if (code !== 204) throw new ResponseError(code, 'Could not deleted the testimony');
  };
}
