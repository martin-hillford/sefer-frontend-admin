import { useGet } from 'sefer-fetch';
import { Configuration } from 'types/data/settings/Configuration';
import { useEffect, useState } from 'react';

export const useSystemSettings = () : [ Configuration | null | undefined, () => void ]  => {
  const data = useGet<Configuration>('/settings');
  const [ settings, setConfig ] = useState<Configuration | null | undefined>();

  useEffect(() => {
    if(!data) { setConfig(data); return; }
    const relativeAvailabilityFactor = 100 * data.relativeAvailabilityFactor;
    setConfig({...data, relativeAvailabilityFactor });
  }, [ data ]);

  return [ settings, () => {} ];
}

