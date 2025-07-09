import { UserBase } from 'types/data/users/UserBase';

export function processUsers<T extends  UserBase>(users : T[] | null | undefined) {
  if(!users) return users;
  users.forEach(u => {
    processUser(u);
  });

  return users;
}

export function processUser<T extends  UserBase>(user : T) {
  // reassign, that is more performant
  user.subscriptionDate = new Date(user.subscriptionDate);
  return user;
}
