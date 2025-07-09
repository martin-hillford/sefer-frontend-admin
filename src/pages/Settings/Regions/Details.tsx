import { Boolean, Loading, Property } from 'sefer/components';
import Region from 'types/data/resources/Region';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Details = (props : { region : Region | undefined}) => {
  const { region } = props;
  const terms = useLocalization(localization);
  if (!region) return <Loading center />;
  return (
    <>
      <Property label={terms.regionId}>{region.id}</Property>
      <Property label={terms.countryCode}>{region.countryCode}</Property>
      <Property label={terms.director}>{region.director}</Property>
      <Property label={terms.enableRewards}><Boolean size={20} colored value={region.enableRewards} /></Property>
      <Property label={terms.isDefault}><Boolean size={20} colored value={region.isDefault} /></Property>
    </>
  );
};
