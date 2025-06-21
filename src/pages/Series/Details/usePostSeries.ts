import { ResponseError } from 'util/errors';
import { Series } from 'types/data/series/Series';
import { usePost } from 'sefer-fetch';

export const usePostSeries = () => {
  const post = usePost();
  return async (series : Series) => {
    const { code } = await post('/series', series);
    if (code === 201) return true;
    throw new ResponseError(code, 'Could not save the series to the server, please try again, if the problem persists please contact the developer.');
  };
}
