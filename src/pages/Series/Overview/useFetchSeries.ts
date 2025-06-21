import { Series } from 'types/data/series/Series';
import { useGetWithRefresh } from 'sefer-fetch';

export const useFetchSeries = () => {
  const state = useGetWithRefresh<Series[]>('/series');
  if (state[0] === null) throw new Error('Could not load the series from the server, please try again, if the problem persists please contact the developer.');
  return state as [Series[] | undefined, () => void, (value: Series[]) => void]
};
