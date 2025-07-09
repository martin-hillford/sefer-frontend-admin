import { useGet } from 'sefer-fetch';
import { JumbotronLayout, ScrollPanel } from 'sefer/components';
import { User as UserIcon } from 'sefer/icons';
import Log from './Log';
import Logs from './Logs';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const logs = useGet<Log[]>('/logs/mail-notifications');
  const terms = useLocalization(localization);
  const crumbs = [
    { label: terms.settings, link: '/settings' },
    { label: terms.emailNotificationLogs, },
  ];

  return (
    <JumbotronLayout overflow="auto" icon={<UserIcon size={13} />} title={terms.logs} subTitle={terms.emailNotificationLogs} crumbs={crumbs}>
      <ScrollPanel>
        <Logs logs={logs} />
      </ScrollPanel>
    </JumbotronLayout>
  );
};
