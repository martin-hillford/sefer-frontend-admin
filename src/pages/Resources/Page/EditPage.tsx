import { Container, JumbotronLayout, Loading } from 'sefer/components';
import { IdParam } from 'components';
import { Grid } from 'sefer/icons';
import { useEnvironmentSites } from 'hooks/useSites';
import { useState } from 'react';
import { PageForm } from './PageForm';
import { useEditPage } from './useEditPage';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

const EditPage = () => <IdParam fallback="/content/pages" onId={id => <LoadPage id={id} />} />;

const LoadPage = ({ id } : {id : number}) => {
  const [site, setSite] = useState<string | undefined>();
  const editContext = useEditPage(id, site);
  const sites = useEnvironmentSites();
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.pages, link: '/content/pages' },
    { label: terms.editPage },
  ];

  const loading = !editContext?.page || !sites;

  return (
    <JumbotronLayout overflow="auto" icon={<Grid size={13} />} title={terms.pages} subTitle={terms.informExplain} crumbs={crumbs}>
      {loading && <Loading variant="huge" />}
      {!loading && (
        <Container>
          <PageForm
            onSaved={editContext.refresh}
            sites={sites!}
            setSite={setSite}
            site={site}
            page={editContext.page!}
          />
        </Container>
      ) }
    </JumbotronLayout>
  );
};

export default EditPage;
