import { useEffect, useState } from 'react';
import { getBinSize } from 'util/binsize';
import { usePost } from 'sefer-fetch';
import { Histogram } from 'types/data/DashboardData';

export const useFetchCourseVisits = (start: number, end: number) => {
  const post = usePost<Histogram>();
  const [ data, setData ] = useState<Histogram | null | undefined>(undefined);

  useEffect(() => {
    const range = getBinSize(start, end);
    const promise = post('/stats/visitors', { ...range, binSize: range.bins, path: '/course%' })
    promise.then(response => {
      if(response.ok) setData(response.body);
      else setData(null);
    })
  }, [ start, end ]);

  return data;
}
