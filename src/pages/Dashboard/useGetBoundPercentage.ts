import { ResponseError } from 'util/errors';
import { useGet } from 'sefer-fetch';

export const useGetBoundPercentage = () => {
  const body = useGet<{ bouncePercentage: number}>('/stats/bounce-percentage');
  if (body === null) throw new ResponseError('Could not fetch bounce percentage');
  return body ? { percentage: body.bouncePercentage } : undefined;
};
