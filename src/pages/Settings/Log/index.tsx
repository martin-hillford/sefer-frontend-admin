import { useGet } from 'sefer-fetch';
import { DateTimeLabel, JumbotronLayout, Loading } from 'sefer/components';
import { Settings } from 'sefer/icons';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import Log from '../Logs/Log';
import { Navigate, useParams } from 'react-router-dom';
import { reduce } from '../Logs/Logs';
import styles from './index.module.css';

export default () => {
  const { id } = useParams<{ id : string | undefined }>();
  if (!id) return <Navigate to="/settings/logs" />;
  return <Page logId={id} />;
}

const Page = (props : { logId: string  }) => {
  const { logId } = props;
  const log = useGet<Log>('/logs/mail-notifications/' + logId);
  const terms = useLocalization(localization);
  const crumbs = [
    { label: terms.settings, link: '/settings' },
    { label: terms.emailNotificationLogs, link: '/settings/logs' },
    { label: terms.log, },
  ];

  return (
    <JumbotronLayout overflow="auto" icon={<Settings size={13} />} title={terms.logs} subTitle={terms.emailNotificationLogs} crumbs={crumbs}>
      <LogDetails log={log} />
    </JumbotronLayout>
  );
};

const LogDetails = (props : { log: Log | null | undefined}) => {
  const { log } = props;
  const terms = useLocalization(localization);

  if(!log) return <Loading />;

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td>{terms.id}</td>
          <td aria-label="id">{log.id}</td>
        </tr>
        <tr>
          <td>{terms.time}</td>
          <td aria-label="timestamp"><DateTimeLabel value={log.timestamp} /></td>
        </tr>
        <tr>
          <td>{terms.level}</td>
          <td aria-label="log-level">{log.logLevel}</td>
        </tr>
        <tr>
          <td>{terms.category}</td>
          <td aria-label="category-name">{reduce(log.categoryName)}</td>
        </tr>
        <tr>
          <td>{terms.message}</td>
          <td className={styles.pre} aria-label="message">{log.message}</td>
        </tr>
        <tr>
          <td>{terms.exception}</td>
          <td className={styles.pre} aria-label="message">{log.exception}</td>
        </tr>
        <tr>
          <td>{terms.stackTrace}</td>
          <td className={styles.pre} aria-label="stack-trace">{log.stackTrace}</td>
        </tr>
      </tbody>
    </table>
  )
}
