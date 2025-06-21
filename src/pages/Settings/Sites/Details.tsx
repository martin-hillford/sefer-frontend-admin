import { Boolean, Loading, Property } from 'sefer/components';
import Site from 'types/data/resources/Site';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Details = (props : { site : Site | undefined}) => {
  const { site } = props;
  const terms = useLocalization(localization);
  if (!site) return <Loading center />;
  return (
    <>
      <Property label={terms.hostname}>{site.hostname}</Property>
      <Property label={terms.type}>{site.type}</Property>
      <Property show={!!site.regionId} label={terms.region}>{site.regionId}</Property>
      <Property show={!!site.mode} label={terms.mode}>{site.mode}</Property>
      <Property show={!!site.destination} label={terms.destination}>{site.destination}</Property>
      <Property show={!!site.supportEmail} label={terms.email}>{site.supportEmail}</Property>
      <Property show={!!site.socialMedia?.twitter} label={terms.twitter}>
        <a href={site.socialMedia?.twitter} target="_blank" referrerPolicy="no-referrer" rel="noreferrer">{site.socialMedia?.twitter}</a>
      </Property>
      <Property show={!!site.socialMedia?.facebook} label={terms.facebook}>
        <a href={site.socialMedia?.facebook} target="_blank" referrerPolicy="no-referrer" rel="noreferrer">{site.socialMedia?.facebook}</a>
      </Property>
      <Property show={!!site.socialMedia?.instagram} label={terms.instagram}>
        <a href={site.socialMedia?.instagram} target="_blank" referrerPolicy="no-referrer" rel="noreferrer">{site.socialMedia?.instagram}</a>
      </Property>
      <Property show={!!site.socialMedia?.youtube} label={terms.youtube}>
        <a href={site.socialMedia?.youtube} target="_blank" referrerPolicy="no-referrer" rel="noreferrer">{site.socialMedia?.youtube}</a>
      </Property>
      <Property label={terms.isDefaultSite}>
        <Boolean size={20} colored value={site.isDefault} />
      </Property>
    </>
  );
};
