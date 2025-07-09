import { useGet } from 'sefer-fetch';
import VersionInfo from 'pages/Settings/Diagnostics/VersionInfo';

export const useGetVersionInfo = () => {
  const info = useGet<VersionInfo>('/info/version')
  if (info === null) throw new Error('Could not fetch backend version info');
  return info;
}
