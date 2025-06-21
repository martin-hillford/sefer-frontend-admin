import { Button, ButtonGroup, EntitiesPanel, EntityForm, JumbotronLayout } from 'sefer/components';
import { User as UserIcon } from 'sefer/icons';
import { useRegions } from 'hooks/useRegions';
import { useState } from 'react';
import Region from 'types/data/resources/Region';
import { Details } from './Details';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const regions = useRegions();
  const terms = useLocalization(localization);
  const crumbs = [
    { label: terms.settings, link: '/settings' },
    { label: terms.regions, },
  ];
  const [selected, setSelected] = useState<Region>();

  return (
    <JumbotronLayout icon={<UserIcon size={13} />} title={terms.regions} subTitle={terms.subTitle} crumbs={crumbs}>
      <EntitiesPanel<Region> data={regions} name="regions" header={terms.regions} onSelect={region => setSelected(region)} onGetLabel={u => u.id}>
        <EntityForm buttons={<SiteButtons label={terms.sites} region={selected} />}>
          <Details region={selected} />
        </EntityForm>
      </EntitiesPanel>
    </JumbotronLayout>
  );
};

const SiteButtons = ({ label, region } : { label: string, region?: Region}) => (
  <ButtonGroup $pull="right">
    <Button href={`/settings/sites?region=${region?.id}`}>
      {label}
    </Button>
  </ButtonGroup>
);
