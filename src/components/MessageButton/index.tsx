import { Button } from 'sefer/components';
import { Message } from 'sefer/icons';
import { UserBase } from 'types/data/users/UserBase';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const MessageButton = (props : {user : UserBase | undefined}) => {
  const { user } = props;
  const terms = useLocalization(localization);

  if (!user) return null;
  return <Button icon={<Message size={16} />} link={`/messages/${user.id}`} label={terms.message} />
};
