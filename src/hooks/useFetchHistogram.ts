import { getDateHistogramQuery } from 'util/binsize';
import { useGet } from 'sefer-fetch';
import { Histogram } from '../types/data/DashboardData';
import { ResponseError } from 'util/errors';

export const useFetchHistogram = (url : string, params? : { start : number, end : number} | undefined) => {
  const query = getDateHistogramQuery(params);
  const result = useGet<Histogram>(`${url}${query}`)
  if(result === null) throw new ResponseError('400', `Could not fetch the stats for url ${url} `);
  return result;
}
