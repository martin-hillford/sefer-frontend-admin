import { useGet } from 'sefer-fetch';
import Site from 'types/data/resources/Site';

export default () => {
  const sites = useGet<Site[]>('/sites');
  return sites?.map((s, index) => ({ ...s, key: s.hostname, id: index } as Site));
};

export const useEnvironmentSites = () => {
  const sites = useGet<Site[]>('/environment/sites');
  return sites?.map((s, index) => ({ ...s, key: s.hostname, id: index } as Site));
};

export const getSiteByKey = (sites : Site[], key? : string) => sites.find(s => s.hostname === key);
