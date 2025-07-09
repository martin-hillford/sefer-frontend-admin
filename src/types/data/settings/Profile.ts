import { UserBase } from '../users/UserBase';

export type Profile = UserBase & {
    emailConfirm : string;
    password : string | null;
}