import { Response, useGetAsync } from 'sefer-fetch';
import { usePrevious } from 'util/usePrevious';
import { useEffect, useState } from 'react';
import { PageWithContent } from 'types/data/resources/PageWithContent';
import { htmlToText } from 'util/html';

export const useEditPage = (id : number, site: string | undefined) => {
  const get = useGetAsync<PageWithContent>();
  const [state, dispatch] = useState(0);
  const [page, setPage] = useState<PageWithContent>();
  const previous = usePrevious({ site, id, state });

  useEffect(() => {
    if (!hasChanges({ id, site, state }, previous)) return;
    fetch(get, id, site).then(p => setPage(p));
  }, [get, site, id, state, previous]);

  const refresh = () => dispatch(s => s - 1);

  return { page, refresh };
};

interface Data {
    id : number
    site: string | undefined
    state: number
}

const hasChanges = (current: Data, previous?: Data | null) => {
  if (current?.id !== previous?.id) return true;
  if (current?.site !== previous?.site) return true;
  return current?.state !== previous?.state;
};

const fetch = async (get: (uri: string) => Promise<Response<PageWithContent>>, id : number, site: string | undefined) => {
  // Always load the content page since it is also necessary in site-specific case
  const contentPageResponse = await get(`/admin/content/pages/${id}`);
  const specificPageResponse = await get(`/admin/content/specific-pages/${site}/${id}`);

  if (!contentPageResponse.ok) return undefined;
  const contentPage = process(contentPageResponse?.body);
  const specificPage = specificPageResponse?.body;

  // If no specific site is requested just returns the content page
  if (!site) return { ...contentPage, id } as PageWithContent;

  // If no specific site is found, create a new one
  if (!specificPage) return { ...contentPage, site, id } as PageWithContent;
  return { ...contentPage, ...specificPage, site, id } as PageWithContent;
};

const process = (page? : PageWithContent) => {
  if (!page?.isHtmlContent) return page;
  return { ...page, content: htmlToText(page.content) };
};
