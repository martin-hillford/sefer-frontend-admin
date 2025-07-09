import { Settings } from 'sefer/icons';
import { JumbotronLayout, Loading } from 'sefer/components';
import { Content } from './Content';
import { useGet } from 'sefer-fetch';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const users = useGet<{ id: number, name: string }[]>('/users');
  const terms = useLocalization(localization);
  const crumbs = [
    { label: terms.settings, link: '/settings' },
    { label: terms.diagnostics, link: '/settings/diagnostics' },
    { label: terms.diagnostics },
  ];

  return (
    <JumbotronLayout
      overflow="auto"
      icon={<Settings size={13} />}
      title={terms.configuration}
      subTitle={terms.settingsAndData}
      crumbs={crumbs}
    >
      {!users && <Loading variant="huge" />}
      {users && <Content users={users} />}
    </JumbotronLayout>
  );
};
