import { useGet } from 'sefer-fetch';
import { useEffect, useState } from 'react';
import { User } from 'types/data/users/User';
import { ResponseError } from 'util/errors';

export default () => {
  const data = useGet<User[]>('/users');
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    if (data === null) throw new ResponseError(400, 'Could not load the user information from the server, please contact the developer.');
    if (data) setUsers(data.map(processUser));
  }, [data]);

  return { users, setUsers };
};

export const processUser = (user : User) => {
  // reassign, that is more performant
  user.subscriptionDate = new Date(user.subscriptionDate);
  return user as User;
};
