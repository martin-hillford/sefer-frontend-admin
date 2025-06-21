import { useEffect, useState } from 'react';
import { useAdminFrontendConfig } from './useAdminFrontendConfig';
import { isEmpty } from 'util/validation';
import { Response, useGetAsync } from 'sefer-fetch';

export function useFetchStatistics<T>(action: string) {
  const statsApi = useAdminFrontendConfig()?.statsApi;
  const [data, setData] = useState<T | null | undefined>(undefined);
  const get = useGetAsync<T>()

  useEffect(() => {
    if (isEmpty(statsApi) || !statsApi) return;

    const process = (response: Response<T>) => {
      const { code, body } = response;
      if (code !== 200 || !body) setData(null);
      else setData(body as T);
    };
    get(`/stats${action}`).then(process);
  }, [action, statsApi]);

  return data;
}
