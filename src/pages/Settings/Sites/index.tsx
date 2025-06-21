import { EntitiesPanel, EntityForm, JumbotronLayout } from 'sefer/components';
import { User as UserIcon } from 'sefer/icons';
import { useQueryString } from 'util/useRouting';
import useSites from 'hooks/useSites';
import { useState } from 'react';
import Site from 'types/data/resources/Site';
import { Details } from './Details';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const { region } = useQueryString();
  const terms = useLocalization(localization);
  const sites = useSites();
  const crumbs = [
    { label: terms.settings, link: '/settings' },
    { label: terms.regions, link: '/settings/regions' },
    { label: terms.sites },
  ];
  const [selected, setSelected] = useState<Site>();

  const data = !sites
    ? undefined
    : sites
      .filter(site => site.hostname !== 'localhost')
      .filter(site => !region || site.type === 'Dynamic' || site.regionId === region)
      .map(site => ({ ...site, id: site.hostname }))
      .sort((a, b) => a.hostname.localeCompare(b.hostname));

  return (
    <JumbotronLayout icon={<UserIcon size={13} />} title={terms.sites} subTitle={terms.subTitle} crumbs={crumbs}>
      <EntitiesPanel<Site & { id: string}> data={data} name="sites" header={terms.sites} onSelect={site => setSelected(site)} onGetLabel={u => u.id}>
        <EntityForm>
          <Details site={selected} />
        </EntityForm>
      </EntitiesPanel>
    </JumbotronLayout>
  );
};
