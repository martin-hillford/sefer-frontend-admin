import { DateTimeLabel, Loading } from 'sefer/components';
import styled from 'styled-components';
import Log from './Log';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default (props : { logs: Log[] | undefined | null}) => {
  const { logs } = props;
  const terms = useLocalization(localization);
  if (!logs) return <Loading />;

  return (
    <Table>
      <thead>
        <tr>
          <th>{terms.time}</th>
          <th>{terms.level}</th>
          <th>{terms.category}</th>
          <th>{terms.message}</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(log => <LogDetails key={log.id} log={log} />)}
      </tbody>
    </Table>
  );
};

const LogDetails = (props : { log: Log}) => {
  const { log } = props;
  return (
    <tr>
      <td aria-label="timestamp"><DateTimeLabel value={log.timestamp} /></td>
      <td aria-label="log-level">{log.logLevel}</td>
      <td aria-label="category-name">{reduce(log.categoryName)}</td>
      <td aria-label="message">{log.message}</td>
    </tr>
  );
};

const Table = styled.table`
    width:100%;

    th { text-align: left;}
`;

const reduce = (categoryName: string) => replacements[categoryName] ?? categoryName;

const replacements = {
  'Sefer.Web.Notifications.Mail.NotificationServiceProcessor': 'Notifications',
  'Sefer.Services.Mail.MailServiceBase': 'Mail Service',
  'Sefer.Web.Notifications.Mail.Service.MailService': 'Mail Renderer'
} as { [key: string]: string }
