import { getBinSize, getDateHistogramQuery } from 'util/binsize';
import { useGetAsync, usePost } from 'sefer-fetch';
import { TimeLineData } from 'components/TimeLineChart';
import { useEffect, useState } from 'react';
import { promiseThenSet } from 'util/promiseThenSet';

export const useFetchBlogVisitors = (start: number, end: number, permalink? : string) => {
  const all = useVisitorsForAll(start, end, permalink);
  const single = useVisitorsForSingle(start, end, permalink);
  return all ? all : single;
}

const useVisitorsForAll = (start: number, end: number,  permalink? : string) => {
  const [ data, setData ] = useState<TimeLineData | null | undefined>();
  const get = useGetAsync<TimeLineData>();

  useEffect(() => {
      // This method is only allowed to load the data for all the blogs, so no permalink can be set
      if(permalink) return setData(undefined);

      const query = getDateHistogramQuery({ start, end });
      const promise = get(`/stats/blog-visitors${query}`);
      promiseThenSet(promise, setData);

  }, [start, end, permalink]);

  return data;
}

const useVisitorsForSingle = (start: number, end: number,  permalink? : string) => {
  const [ data, setData ] = useState<TimeLineData | null | undefined>();
  const post = usePost<TimeLineData>();

  useEffect(() => {
    if(!permalink) return setData(undefined);
    const range = getBinSize(start, end);
    const promise = post('/stats/visitors', { ...range, binSize: range.bins, path: `/blogs/${permalink}` })
    promiseThenSet(promise, setData);

  }, [start, end, permalink]);

  return data;
}


