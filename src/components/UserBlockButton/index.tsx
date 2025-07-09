import { User } from 'types/data/users/User';
import { BlockButton } from './BlockButton';
import { UnblockButton } from './UnblockButton';

export const UserBlockButton = (props : {user : User | undefined | null, onBlockChanged : (blocked: boolean) => void }) => {
  const { user, onBlockChanged } = props
  if (!user) return null;
  const forwardProps = { user, onBlockChanged }
  if(user.blocked) return <UnblockButton {...forwardProps} />;
  return <BlockButton {...forwardProps} />;
};
