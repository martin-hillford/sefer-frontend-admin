import { ResponseError } from 'util/errors';
import { useDelete } from 'sefer-fetch';

export const useDeleteSeries = () => {
  const del = useDelete();
  return async (seriesId: number) => {
    const { code } = await del(`/series/${seriesId}`, {});
    if (code !== 204) throw new ResponseError(code, 'Could not delete the series');
    return true;
  };
}
