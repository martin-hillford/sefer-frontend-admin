import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePostSeriesSequence = () => {
  const post  = usePost();
  return async (series: number[]) => {
    const { code } = await post('/series/sequence', series);
    if (code === 200) return true;
    throw new ResponseError(code, 'Could not save the sequence of the series to the server, please try again, if the problem persists please contact the developer.');
  };
}
