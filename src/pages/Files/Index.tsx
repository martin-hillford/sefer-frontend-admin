import { NoScrollLayout, PageHeader } from 'sefer/components';
import { FileSystem } from 'components';
import styled from 'styled-components';

const Files = () => (
  <NoScrollLayout>
    <Container>
      <Header>
        <PageHeader title="Bestanden" subTitle="afbeeldingen & video's" />
      </Header>
      <Content>
        <FileSystem />
      </Content>
    </Container>
  </NoScrollLayout>
);

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    flex: 0 0 100%;
`;

const Header = styled.div`
    width: 100%;
    flex: 0 0 65px;
    border-bottom: 1px solid #ddd!important;
    padding: 0 15px;
`;

const Content = styled.div`
    width: 100%;
    flex: 1 0 auto;
`;

export default Files;
