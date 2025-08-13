import { ButtonGroup } from 'sefer/components';
import { MessageButton, UserBlockButton } from 'components';
import Region from 'types/data/resources/Region';
import Site from 'types/data/resources/Site';
import { User } from 'types/data/users/User';
import { ActivateUserButton } from 'components/ActivateUserButton';
import { ChangeRoleButton } from 'components/ChangeRoleButton';
import { ChangeRegionOrSiteButton } from './ChangeRegionOrSiteButton';
import DisableTwoFactorAuthButton from './DisableTwoFactorAuthButton';
import { ImpersonationButton } from './ImpersonationButton';
import { UserRole } from 'sefer/data/UserRole';

interface Props {
  onRegionOrSiteChanged : (region: Region, site: Site) => void
  user : User | undefined
  onBlockChanged : (blocked: boolean) => void
  onRoleChanged : (role: (UserRole | undefined)) => void
  onActivated : () => void
  regions: Region[] | undefined
  sites: Site[] | undefined
  onTwoAuthDisabled : () => void
}

export const Actions = (props : Props) => {
  const { regions, user, sites, onBlockChanged, onRoleChanged, onActivated, onTwoAuthDisabled, onRegionOrSiteChanged } = props;

  if (!user || !regions || !sites) return null;

  return (
    <ButtonGroup $pull="right">
      <DisableTwoFactorAuthButton user={user} onTwoAuthDisabled={onTwoAuthDisabled} />
      <ImpersonationButton user={user} />
      <ChangeRegionOrSiteButton sites={sites} user={user} regions={regions} onChanged={onRegionOrSiteChanged} />
      <MessageButton user={user} />
      <UserBlockButton user={user} onBlockChanged={onBlockChanged} />
      <ChangeRoleButton user={user} onRoleChanged={onRoleChanged} />
      <ActivateUserButton user={user} onActivated={onActivated} />
    </ButtonGroup>
  );
};
