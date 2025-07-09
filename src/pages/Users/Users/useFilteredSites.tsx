import { useAdminFrontendConfig } from 'hooks/useAdminFrontendConfig';
import Site from 'types/data/resources/Site';
import { Config } from 'util/configuration';

const filterSites = (sites: Site[], region: string, config: Config) => {
  const filter = (s : Site) => {
    if (s.type === 'Redirect') return false;
    if (s.mode === 'App') return false;
    if (s.type === 'Static' && s.regionId !== region) return false;
    if (s.hostname.includes('localhost')) return false;
    if (config.environment === 'development' && s.environment === 'acceptance') return true;
    return s.environment === config.environment;
  };

  return sites.filter(filter);
};

const useFilteredSites = (sites: Site[], region: string) => {
  const config = useAdminFrontendConfig();
  if (!config || !sites) return null;

  return filterSites(sites, region, config!);
};

export default useFilteredSites;
