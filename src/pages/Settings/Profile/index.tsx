import { Alert, Container, JumbotronLayout, Loading, Overlay } from 'sefer/components';
import { Settings } from 'sefer/icons';
import { useState } from 'react';
import { Content } from './Content';
import { useProfile } from './util';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const { context, save } = useProfile();
  const [code, setCode] = useState<number | undefined>(undefined);
  const terms = useLocalization(localization)

  const crumbs = [
    { label: terms.settings, link: '/settings' },
    { label: terms.profile },
  ];

  const onSave = async () => {
    const result = await save();
    setCode(result.code);
    return result.valid;
  };

  return (
    <JumbotronLayout overflow="auto" icon={<Settings size={13} />} title={terms.profile} subTitle={terms.settingsAndData} crumbs={crumbs}>
      <Container>
        { !context && <Loading variant="huge" /> }
        { context && <Content save={onSave} context={context} />}
        { code === 202 && <EmailAlert content={terms.emailConfirmationMessage} setCode={setCode} /> }
        { code === 400 && <ErrorAlert content={terms.errorMessage} setCode={setCode} /> }
      </Container>
    </JumbotronLayout>
  );
};

const EmailAlert = (props : { setCode : (code?: number) => void, content: string }) => {
  const { content, setCode } = props;
  return (
    <Overlay>
      <Alert variant="success" onClosed={() => setCode(undefined)} closable={false}>
        {content}
      </Alert>
    </Overlay>
  );
};

const ErrorAlert = (props : { setCode : (code?: number) => void, content: string }) => {
  const { content, setCode } = props;
  return (
    <Overlay>
      <Alert variant="danger" closable={false} onClosed={() => setCode(undefined)}>
        {content}
      </Alert>
    </Overlay>
  );
};
