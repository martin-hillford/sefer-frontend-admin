import { Header, KeyValueTable } from 'sefer/components';
import VersionInfo from './VersionInfo';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Version = (props : { version : VersionInfo }) => {
  const { version } = props;
  const terms = useLocalization(localization);

  const data = [
    { key: terms.build, value: version.build },
    { key: terms.release, value: version.release },
    { key: terms.database, value: version.database },
    { key: terms.environment, value: version.environment },
    { key: terms.isDevelopmentEnv, value: version.isDevelopmentEnv ? 'true' : 'false' },
    { key: terms.adminEmail, value: version.adminEmail },
  ];

  return (
    <>
      <Header inline variant="large">{terms.versionInfo}</Header>
      <KeyValueTable data={data} />
    </>
  );
};
