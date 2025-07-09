import { Boolean, DateLabel, Gender, Loading, Property, Role } from 'sefer/components';
import Region from 'types/data/resources/Region';
import { User } from 'types/data/users/User';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Details = (props : { user : User | undefined, regions: undefined | Region[]}) => {
  const { regions, user } = props;
  const terms = useLocalization(localization).details;

  if (!user || !regions) return <Loading center />;
  return (
    <>
      <Property label={terms.name}>{user.name}</Property>
      <Property label={terms.gender}>
        <Gender value={user.gender} />
      </Property>
      <Property label={terms.email}>{user.email}</Property>
      <Property label={terms.primarySite}>{user.primarySite}</Property>
      <Property label={terms.primaryRegion}>{user.primaryRegion}</Property>
      <Property label={terms.role}>
        <Role value={user.role} />
      </Property>
      <Property label={terms.hasAccess}><Boolean size={16} value={!user.blocked} /></Property>
      <Property label={terms.activated}><Boolean size={16} value={user.approved} /></Property>
      <Property label={terms.twoFactorAuth}>
        <Boolean size={16} value={user.twoFactorAuthEnabled} />
      </Property>
      <Property label={terms.subscriptionDate}>
        <DateLabel value={user.subscriptionDate} />
      </Property>
    </>
  );
};
