import { usePost, usePut } from 'sefer-fetch';
import { usePrevious } from 'util/usePrevious';
import { useEffect, useMemo } from 'react';
import { PageWithContent, usePageWithContentContext } from 'types/data/resources/PageWithContent';

export default (value: PageWithContent, onSaved: (data: PageWithContent) => void, site : string | undefined) => {
  const putPage = usePut<PageWithContent>();
  const postPage = usePost<PageWithContent>();
  const page = useMemo(() => ({ ...value }), [value]);
  const previous = usePrevious(page);
  const { context } = usePageWithContentContext(page);

  useEffect(() => {
    const updated = isChanged(page, previous);
    if (!updated) return;
    context.setValue('isPublished', page.isPublished);
    context.setValue('content', page.content);
  }, [page, previous, context]);

  const save = async () => {
    // 1) The user wants to set a site-specific page
    if (site !== undefined && site !== 'generic') {
      const { content, isPublished, id } = context.data;
      const body = { content, isPublished, site, contentPageId: id };
      const handled = await postPage('/admin/content/site-specific-pages', body);
      if (handled.ok) context.set({ ...context.data, specificContentId: handled.body?.id });
      context.resetHasChanges();
      onSaved(context.data);
      return;
    }

    // 2) The user wants to insert a new page
    if (context.data.id === -1) {
      const handled = await postPage('/admin/content/pages', context.data);
      if (handled.ok && handled.body) context.set({ ...context.data, id: handled.body.id! });
      context.resetHasChanges();
      onSaved(context.data);
      return;
    }

    if (context.data.id !== -1) {
      const handled = await putPage(`/admin/content/pages/${context.data.id}`, context.data);
      if (handled.ok) context.set({ ...context.data });
      context.resetHasChanges();
      onSaved(context.data);
    }
  };

  return { context, save };
};

const isChanged = (current: PageWithContent, previous?: PageWithContent | null) => {
  if (previous?.content !== current.content) return true;
  return previous?.isPublished !== current.isPublished;
};
