import { useEffect, useState } from 'react';
import { Config, getConfiguration } from 'util/configuration';

export function useAdminFrontendConfig() : Config | undefined {
  const [config, setConfig] = useState<Config>();

  useEffect(() => {
    const fetchConfig = async () => {
      setConfig(await getConfiguration());
    };
    fetchConfig().then();
  }, []);

  return config;
}
