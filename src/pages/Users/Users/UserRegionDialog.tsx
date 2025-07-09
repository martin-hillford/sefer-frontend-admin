import Region from 'types/data/resources/Region';
import Site from 'types/data/resources/Site';
import { User } from 'types/data/users/User';
import { useEffect, useState } from 'react';
import useFilteredSites from './useFilteredSites';
import { ConfirmDialog, DropDown, Property } from 'sefer/components';
import styled from 'styled-components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  onConfirmed: (region: string, site: string) => void,
  regions: Region[],
  sites: Site[],
  onCanceled: () => void,
  user: User
  show: boolean
}

export const UserRegionDialog = (props: Props) => {
  const { user, onConfirmed, onCanceled, regions, sites, show } = props;
  const [region, setRegion] = useState<string>(user.primaryRegion);
  const [site, setSite] = useState<string>(user.primarySite);
  const onConfirmedHandler = () => { onConfirmed(region, site); };
  const filteredSites = useFilteredSites(sites, region);
  const terms = useLocalization(localization).changeRegion;

  useEffect(() => {
    if (!region || !filteredSites) return;
    // Ensure that when the site is not in the region that the first site in the region is selected
    const contains = filteredSites.find(s => s.hostname === site);
    if (!contains) setSite(filteredSites[0].hostname);
  }, [region, filteredSites, site]);

  if (!show || !filteredSites) return null;

  const regionsOptions = regions.map(s => ({ label: s.id, value: s.id }));
  const sitesOptions = filteredSites.map(s => ({ label: s.hostname, value: s.hostname }));

  const Content = () => (
    <>
      <Sizer>{terms.question}</Sizer>
      <Property label={terms.region}>
        <DropDown value={region} onChange={setRegion} name="region" options={regionsOptions} />
      </Property>
      <Property label={terms.site}>
        <DropDown value={site} onChange={setSite} name="site" options={sitesOptions} />
      </Property>
    </>
  );

  return (
    <ConfirmDialog header={terms.header} content={<Content />}
      buttonText={terms.change}
      onConfirmed={onConfirmedHandler}
      onCanceled={onCanceled}
      variant="danger"
    />
  );
};

const Sizer = styled.div`
    width: 400px;
    padding-bottom: 12px;
`;
