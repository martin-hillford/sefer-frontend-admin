import { useGet } from 'sefer-fetch';
import Region from 'types/data/resources/Region';

export const useRegions = () => {
  const regions = useGet<Region[]>('/regions');
  return regions?.map((s, index) => ({ ...s, key: s.id, index } as Region));
};

export const getRegionByKey = (regions : Region[], key? : string) => regions.find(s => s.id === key);
