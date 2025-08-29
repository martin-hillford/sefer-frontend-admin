import { Chat } from 'sefer-chat';
import { BaseLayout, Loading, NoScrollLayout } from 'sefer/components';
import { MessageAdmin } from 'sefer/icons';
import { useUserContext } from 'context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useAdminChannel from './useAdminChannel';
import { useAvailableLanguage } from 'sefer/hooks/useAvailableLanguage';
import { theme } from './theme';
import { localization } from './localization';
import { useFetchContext } from 'sefer-fetch';

export default () => {
  const { userId } = useParams<{ userId : string | undefined }>();
  const channel = useAdminChannel(userId);
  const navigate = useNavigate();
  const { user } = useUserContext();
  const fetchContext = useFetchContext()
  const language = useAvailableLanguage();
  const culture = language === 'nl' ? 'nl-NL' : 'en-US';
  const terms = localization[language];

  const loading = userId && channel?.id === undefined;
  if (loading) return <LoadWrapper />;

  const crumbs = [{ label: terms.messages },];
  return (
    <BaseLayout crumbs={crumbs} title={terms.messages} subTitle={terms.contactAndSupport} icon={<MessageAdmin size={13} />}>
      <Container>
          <Chat
            initialChannelId={channel?.id}
            minWidthForComposedView={800}
            culture={culture}
            language={language}
            user={user}
            navigate={navigate}
            showBackToDashboard={false}
            markMessageAsReadDelay={2500}
            fetchContext={fetchContext}
            theme={theme}
          />
      </Container>
    </BaseLayout>
  );
};

const LoadWrapper = () => (
  <NoScrollLayout>
    <Container>
      <Loading />
    </Container>
  </NoScrollLayout>
);

const Container = styled.div`
    display: flex;
    height: calc(100vh - 128px);
    width: calc(100% + 30px);
    overflow: hidden;
    flex-direction: row;
    flex: 0 0 100%;
    > div { width: 100% }
    border-top: 1px solid #ededed;
    margin: 0 -15px;
`;
