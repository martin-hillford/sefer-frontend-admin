import { ButtonGroup, Container, Header, JumbotronLayout, PasswordField, SaveButton } from 'sefer/components';
import { Settings } from 'sefer/icons';
import { useState } from 'react';
import { usePassword } from './hooks';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

const Index = () => {
  const [context, save] = usePassword();
  const [code, setCode] = useState<number | undefined>();
  const terms = useLocalization(localization);

  if (!context) return null;

  const crumbs = [
    { label: terms.settings, link: '/settings' },
    { label: terms.password },
  ];

  const onValidate = async () => context.validate();

  const onSave = async () => {
    const result = await save();
    setCode(result);
    return true;
  };

  const message = getSavedMessage(code);

  return (
    <JumbotronLayout overflow="auto" icon={<Settings size={13} />} title={terms.security} subTitle={terms.accessAndVerification} crumbs={crumbs}>
      <Container>
        <Header inline={false} variant="xx-large">{terms.changePassword}</Header>
        <PasswordField label={terms.currentPassword} dataContext={context} name="old" />
        <PasswordField label={terms.newPassword} dataContext={context} name="new" />
        <PasswordField label={terms.confirmation} dataContext={context} name="confirm" />

        <ButtonGroup $pull="right">
          <SaveButton
            onValidate={onValidate}
            saving={terms.updatingPassword}
            saved={message}
            onSave={onSave}
            variant={code === 403 ? 'danger' : 'success'}
          />
        </ButtonGroup>
      </Container>
    </JumbotronLayout>
  );
};

const getSavedMessage = (code : number | undefined) => {
  const terms = useLocalization(localization);
  if (code === 403) return terms.incorrectPassword;
  return terms.passwordUpdated;
};

export default Index;
