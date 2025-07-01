import { useEffect, useState } from 'react';
import { Response, useGetAsync } from 'sefer-fetch';

export function useFetchStatistics<T>(action: string) {
  const [data, setData] = useState<T | null | undefined>(undefined);
  const get = useGetAsync<T>()

  useEffect(() => {

    const process = (response: Response<T>) => {
      const { code, body } = response;
      if (code !== 200 || !body) setData(null);
      else setData(body as T);
    };
    get(`/stats${action}`).then(process);
  }, [ action ]);

  return data;
}
