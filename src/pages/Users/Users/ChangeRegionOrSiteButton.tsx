import { Alert, Button, Overlay, SavedAlert, SavingAlert } from 'sefer/components';
import { getRegionByKey } from 'hooks/useRegions';
import { getSiteByKey } from 'hooks/useSites';
import { useState } from 'react';
import Region from 'types/data/resources/Region';
import Site from 'types/data/resources/Site';
import { User } from 'types/data/users/User';
import { usePost } from 'sefer-fetch';
import { UserRegionDialog } from './UserRegionDialog';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  user: User | undefined,
  regions: Region[],
  sites: Site[],
  onChanged: (region: Region, site: Site) => void
}

export const ChangeRegionOrSiteButton = (props: Props) => {
  const { user, onChanged, regions, sites } = props;
  const userRegion = getRegionByKey(regions, user?.primaryRegion);
  const userSite = getSiteByKey(sites, user?.primarySite);
  const [primaryRegion, setPrimaryRegion] = useState<Region | undefined>(userRegion);
  const [primarySite, setPrimarySite] = useState<Site | undefined>(userSite);
  const post = usePost();
  const terms = useLocalization(localization).changeRegion;

  const [state, setState] = useState<string | null>(null);
  if (!user) return null;

  const onCanceled = () => { setState(null); };

  const onChangedConfirmed = async (regionId: string, siteId: string) => {
    // Check if there actually was a change!
    const region = getRegionByKey(regions, regionId);
    const site = getSiteByKey(sites, siteId);
    if (!site || !region) return setState('change-error');
    if (region!.id === user.primaryRegion && site?.hostname === user.primarySite) return setState('saved');

    // Save the region and site
    setState('saving');
    setPrimaryRegion(region);
    setPrimarySite(site);
    const changed = await post('/users/primary-region-site', {
      userId: user.id,
      region: region.id,
      site: site.hostname,
    });

    if (changed.ok) return setState('saved');
    return setState('change-error');
  };

  const onRegionClosed = () => {
    setState(null);
    onChanged(primaryRegion!, primarySite!);
  };

  return (
    <>
      <UserRegionDialog
        show={state === 'start'}
        sites={sites}
        regions={regions}
        onConfirmed={onChangedConfirmed}
        onCanceled={onCanceled}
        user={user}
      />
      <SavingAlert show={state === 'saving'} content={terms.saving} />
      <SavedAlert show={state === 'saved'} content={terms.saved} onClosed={onRegionClosed} />
      {state === 'change-error' && <ChangeError onClosed={() => { setState(null); }} />}
      <Button variant="default" onClick={() => setState('start')}>{terms.site}</Button>
    </>
  );
};

const ChangeError = (props: { onClosed?: () => void }) => {
  const { onClosed } = props;
  const terms = useLocalization(localization).changeRegion;
  return (
    <Overlay>
      <Alert variant="danger" hide="auto" closable timeout={2500} onClosed={onClosed}>
        {terms.error}
      </Alert>
    </Overlay>
  );
};


