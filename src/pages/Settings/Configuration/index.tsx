import { Container, JumbotronLayout, Loading } from 'sefer/components';
import { Settings } from 'sefer/icons';
import { Form } from './Form';
import { useConfig } from './util';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';

export default () => {
  const terms = useLocalization(localization);
  const { context, admins, state, save, onClosed } = useConfig();

  const crumbs = [
    { label: terms.settings, link: '/settings' },
    { label: terms.websiteConfiguration, },
  ];

  const loaded = admins && context;

  return (
    <JumbotronLayout overflow="auto" icon={<Settings size={13} />} title={terms.configuration} subTitle={terms.settingsAndData} crumbs={crumbs}>
      <Container>
        { !loaded && <Loading variant="huge" /> }
        { loaded && <Form context={context!} admins={admins} save={save} onClosed={onClosed} state={state} />}
      </Container>
    </JumbotronLayout>
  );
};
