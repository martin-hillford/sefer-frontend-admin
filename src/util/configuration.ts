// A static store for the configuration
import { useEffect, useState } from 'react';

let configuration: Config | null = null;

// This method will return the configuration
export const getConfiguration = async () => {
  if (configuration === null) await fetchConfiguration();
  return configuration as Config;
};

export type Config = {
    api: string;
    language: string;
    publicSite: string;
    environment: string;
    editor?: { type: string, url: string, class: string, color: string }[] | undefined
}

const fetchConfiguration = async () => {
  const response = await fetch('/config.json');
  configuration = await response.json() as Config;
};

export const useFetchConfiguration = () => {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const fetch = async () => setConfig(await getConfiguration());
    fetch().then();
  }, []);

  return config;
};

