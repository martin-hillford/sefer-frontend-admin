import { Series } from 'types/data/series/Series';
import { useGetAsync } from 'sefer-fetch';

export const useFetchSeriesDetails = () => {
  const get = useGetAsync<Series>();
  return async (seriesId : number) => {
    const { code, body } = await get(`/series/${seriesId}`);
    if(code !== 200) throw new Error('Could not load the series from the server, please try again, if the problem persists please contact the developer.');
    return body;
  }
};
