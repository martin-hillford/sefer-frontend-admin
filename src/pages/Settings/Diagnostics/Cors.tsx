import { Header, KeyValueTable } from 'sefer/components';
import { CorsInfo } from 'types/data/settings/CorsInfo';
import { KeyValuePair } from 'types/data/settings/KeyValuePair';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Cors = (props : { corsInfo : CorsInfo }) => {
  const { corsInfo } = props;
  const terms = useLocalization(localization);

  const data = [
    { key: 'Access', value: corsInfo.access ? 'true' : 'false' },
    { key: 'Allowed', value: corsInfo.allowed.join(', ') },
    { key: 'Origin', value: corsInfo.origin },
    { key: 'Raw', value: corsInfo.raw },
    { key: 'Referer', value: corsInfo.referer },
  ] as KeyValuePair[];

  return (
    <>
      <Header inline variant="large">{terms.corsInfo}</Header>
      <KeyValueTable data={data} />
    </>
  );
};
