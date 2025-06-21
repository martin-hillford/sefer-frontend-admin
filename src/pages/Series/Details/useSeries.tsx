import { useEffect, useState } from 'react';
import { Level } from 'types/data/Level';
import { Series } from 'types/data/series/Series';
import { useCreateDataContext } from './useCreateDataContext';
import { usePostSeries } from './usePostSeries';
import { usePutSeries } from './usePutSeries';
import { useFetchSeriesDetails } from './useFetchSeriesDetails';
import { DataContext } from 'sefer/types/DataContext';

export const useSeries = (seriesId?: number) => {
  const createContext = useCreateDataContext();
  const [context, setContext] = useState<DataContext<Series> | undefined>();

  const postSeries = usePostSeries();
  const putSeries = usePutSeries();
  const fetchSeries = useGetSeries();

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchSeries(seriesId);

      if (!result) return;
      const context = createContext(result);
      context.setListener(setContext);
      setContext(context);
    };

    fetch().then();
  }, [seriesId, setContext]);

  const save = async () => {
    if (!context?.data) return false;
    if (!seriesId) return await postSeries(context.data);
    return await putSeries(context.data);
  };

  return { series: context, save };
};

const useGetSeries = () => {
  const fetchSeries = useFetchSeriesDetails();
  return async (seriesId?: number) => {
    if (!seriesId) return createSeries() as Series;
    return await fetchSeries(seriesId);
  }
};

const createSeries = () => ({ name: '', id: -1, description: '', level: Level.Novice, isPublic: false });

