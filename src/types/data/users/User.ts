import { UserBase } from './UserBase';

export type User = UserBase & {
    blocked: boolean;
    hasAccess: boolean;
    approved: boolean;
    twoFactorAuthEnabled: boolean;
};