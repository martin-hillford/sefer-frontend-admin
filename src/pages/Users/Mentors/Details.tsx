import { Boolean, DateLabel, Gender, Loading, Property, Rating } from 'sefer/components';
import { Mentor } from 'types/data/users/Mentor';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type Extended = Mentor & { primaryRegion?: string, primarySite? : string };

export const Details = ({ mentor } : { mentor : Mentor | undefined}) => {
  if (!mentor) return <Loading center />;
  const terms = useLocalization(localization);

  return (
    <>
      <Property label={terms.name}>{mentor.name}</Property>
      <Property label={terms.gender}>
        <Gender value={mentor.gender} />
      </Property>
      <Property label={terms.email}>{mentor.email}</Property>
      <Property label={terms.primarySite}>{(mentor as Extended).primarySite}</Property>
      <Property label={terms.primaryRegion}>{(mentor as Extended).primaryRegion}</Property>
      <Property label={terms.activeStudents}>{mentor.activeStudents}</Property>
      <Property label={terms.preferredStudents}>{mentor.preferredStudents}</Property>
      <Property label={terms.maximumStudents}>{mentor.maximumStudents}</Property>
      <Property label={terms.rating}>
        <Rating value={mentor.rating} />
      </Property>
      <Property label={terms.hasAccess}><Boolean size={16} value={!mentor.blocked} /></Property>
      <Property label={terms.subscriptionDate}>
        <DateLabel value={mentor.subscriptionDate} />
      </Property>
    </>
  );
};
