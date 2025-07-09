import { Container, Header, JumbotronLayout } from 'sefer/components';
import { Grid } from 'sefer/icons';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { PageType } from 'types/data/resources/PageType';
import { PageWithContent } from 'types/data/resources/PageWithContent';
import { PageForm } from './PageForm';
import { useCreatePage } from './useCreatePage';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const type = useSearchParams()[0].get('type');
  switch (type) {
    case PageType.IndividualPage:
      return <CreatePageWithType type={PageType.IndividualPage} />;
    case PageType.MenuPage:
      return <CreatePageWithType type={PageType.MenuPage} />;
    default:
      return <Navigate to="/contents/pages" />;
  }
};

const CreatePageWithType = (props : { type : PageType}) => {
  const navigate = useNavigate();
  const terms = useLocalization(localization);
  const { type } = props;
  const crumbs = [
    { label: terms.pages, link: '/content/pages' },
    { label: terms.addPage },
  ];

  const page = useCreatePage(type);
  const saved = (data: PageWithContent) => {
    if (data?.id) navigate(`/content/pages/${data.id}`);
  };

  return (
    <JumbotronLayout overflow="auto" icon={<Grid size={13} />} title={terms.pages} subTitle={terms.informExplain} crumbs={crumbs}>
      <Container>
        <Header inline={false} children={terms.addPage} variant="large" />
        <PageForm onSaved={saved} page={page} />
      </Container>
    </JumbotronLayout>
  );
};
