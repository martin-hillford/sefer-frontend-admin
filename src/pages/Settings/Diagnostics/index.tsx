import { Alert, Button, ButtonGroup, Container, Header, JumbotronLayout, Line, Loading } from 'sefer/components';
import { Settings } from 'sefer/icons';
import { useState } from 'react';
import { CorsInfo } from 'types/data/settings/CorsInfo';
import { HttpHeader } from 'types/data/settings/HttpHeader';
import { Cors } from './Cors';
import { Headers } from './Headers';
import { Version } from './Version';
import VersionInfo from './VersionInfo';
import { useGet, usePost, usePostSync } from 'sefer-fetch';
import { useGetVersionInfo } from 'hooks/useGetVersionInfo';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';
import useSites from 'hooks/useSites';

export default () => {
  const headers = useGet<HttpHeader[]>('/info/headers');
  const corsInfo = usePostSync<CorsInfo>('/info/cors', { } )?.body;
  const version = useGetVersionInfo();
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.settings, link: '/settings' },
    { label: terms.diagnosis },
  ];

  const loaded = headers && corsInfo && version;

  return (
    <JumbotronLayout
      overflow="auto"
      icon={<Settings size={13} />}
      title={terms.diagnosis}
      subTitle={terms.subTitle}
      crumbs={crumbs}
    >
      {!loaded && <Loading variant="huge" />}
      {loaded && <Content headers={headers} corsInfo={corsInfo} version={version} />}
    </JumbotronLayout>
  );
};

const Content = (props: { headers: HttpHeader[], corsInfo: CorsInfo, version: VersionInfo }) => {
  const { version, corsInfo, headers } = props;
  const [mailing, setMailing] = useState(false);
  const terms = useLocalization(localization);
  const defaultSite = useSites()?.find(s => s.type === "Dynamic");
  const post = usePost();

  const mail = async () => {
    setMailing(true);
    await post(`/info/admin-test-email?site=${defaultSite?.name}`, {  });
  };

  return (
    <Container>
      <Header inline={false} variant="xx-large">{terms.diagnosis}</Header>
      <p>{terms.header}</p>
      <br />
      <Version version={version} />
      <Line />
      <Cors corsInfo={corsInfo} />
      <Line />
      <Headers headers={headers} content={terms.headers} />
      <Line />
      <ButtonGroup $pull="right">
        <Button
          href="/settings/diagnostics/push-notifications"
          variant="default"
          label={terms.testNotifications}
        />
        <Button onClick={mail} variant="primary" label={terms.testEmail} />
      </ButtonGroup>
      {mailing && <Emailing content={terms.emailSent} onClosed={() => setMailing(false)} />}
    </Container>
  );
};

const Emailing = ({ content, onClosed }: { content: string, onClosed: () => void }) => (
  <Alert overlay closable onClosed={onClosed} variant="success">
    {content}
  </Alert>
);
