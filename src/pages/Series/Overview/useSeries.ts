import { Series } from 'types/data/series/Series';
import { useFetchSeries } from './useFetchSeries';
import { usePostSeriesIsPublic } from './usePostSeriesIsPublic';
import { usePostSeriesSequence } from './usePostSeriesSequence';
import { useDeleteSeries } from './useDeleteSeries';

export const useSeries = () => {
  const [series, refresh] = useFetchSeries();
  const deleteSeries = useDeleteSeries();
  const postSeriesIsPublic = usePostSeriesIsPublic();
  const postSeriesSequence = usePostSeriesSequence();

  const onDelete = async (deleting : Series) => {
    if (deleting.id < 1) return false;
    return await deleteSeries(deleting.id);
  };

  const onChange = async (seriesId: number, setPublic: boolean) => await postSeriesIsPublic(seriesId, setPublic);

  const saveSequence = async (data : Series[]) => await postSeriesSequence(data.map(s => s.id));

  return { series, refresh, onDelete, onChange, saveSequence };
};
