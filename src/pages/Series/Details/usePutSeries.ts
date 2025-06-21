import { ResponseError } from 'util/errors';
import { Series } from 'types/data/series/Series';
import { usePut } from 'sefer-fetch';

export const usePutSeries = () => {
  const put = usePut();
  return async (series : Series) => {
    const { code } = await put(`/series/${series.id}`, series);
    if (code === 202) return true;
    throw new ResponseError(code, 'Could not save the series to the server, please try again, if the problem persists please contact the developer.');
  };
};
