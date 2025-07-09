import { EntitiesNotFound, JumbotronLayout, Loading } from 'sefer/components';
import { Grid } from 'sefer/icons';
import { Page } from 'types/data/resources/Page';
import { Pages } from './Pages';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useFetchPages } from './useFetchPages';

export default () => {
  const [pages, refresh, setPages] = useFetchPages();
  const terms = useLocalization(localization);
  const crumbs = [
    { label: terms.pagesTitle },
  ];

  return (
    <JumbotronLayout overflow="auto" icon={<Grid size={13} />} title={terms.pagesTitle} subTitle={terms.pagesSubtitle} crumbs={crumbs}>
      <Content refresh={refresh} pages={pages} setPages={setPages} />
    </JumbotronLayout>
  );
};

const Content = (props : { pages : Page[] | undefined, refresh : () => void, setPages : (pages: Page[]) => void }) => {
  const { refresh } = props;
  const terms = useLocalization(localization);
  const onRefresh = () => refresh();

  const { pages } = props;
  if (!pages) return <Loading variant="huge" />;
  if (pages.length === 0) return <EntitiesNotFound header={terms.pagesTitle} content={terms.noPagesFoundContent} />;
  return <Pages {...props} refresh={onRefresh} pages={pages} />;
};
