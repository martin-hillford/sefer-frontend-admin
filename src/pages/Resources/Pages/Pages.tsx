import { Page } from 'types/data/resources/Page';
import { PageType } from 'types/data/resources/PageType';
import { Header, ThreeColumns } from 'sefer/components';
import { PageList } from './PageList';
import { sort } from './sort';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Pages = (props : { pages : Page[], refresh : () => void, setPages : (pages: Page[]) => void }) => {
  const { pages, refresh, setPages } = props;
  const { special, menu, separate } = sort(pages);
  const terms = useLocalization(localization);

  const onSorted = (sorted : Page[]) => {
    const filtered = pages.filter(p => p.type !== PageType.MenuPage);
    setPages([...filtered, ...sorted]);
  };

  return (
    <ThreeColumns.Row>
      <ThreeColumns.Column>
        <Header inline={false} variant="large">{terms.specialPages}</Header>
        <PageList type="special" pages={special} refresh={refresh} onSorted={onSorted} />
      </ThreeColumns.Column>
      <ThreeColumns.Column>
        <Header inline={false} variant="large">{terms.menuPages}</Header>
        <PageList type="menu" pages={menu} refresh={refresh} onSorted={onSorted} />
      </ThreeColumns.Column>
      <ThreeColumns.Column>
        <Header inline={false} variant="large">{terms.specialPages}</Header>
        <PageList type="separate" pages={separate} refresh={refresh} onSorted={onSorted} />
      </ThreeColumns.Column>
    </ThreeColumns.Row>
  );
};
