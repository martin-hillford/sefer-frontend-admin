import { Page } from 'types/data/resources/Page';
import { PageType } from 'types/data/resources/PageType';

export const sort = (pages : Page[]) => {
  const special = [] as Page[];
  const menu = [] as Page[];
  const separate = [] as Page[];

  pages.forEach(page => {
    switch (page.type) {
      case PageType.IndividualPage:
        separate.push(page);
        break;
      case PageType.MenuPage:
        menu.push(page);
        break;
      default:
        special.push(page);
        break;
    }
  });

  return { special, menu, separate };
};