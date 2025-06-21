import Gender from '../Gender';
import NotificationPreference from '../NotificationPreference';
import UserRole from '../UserRole';

export type UserBase = {
    role: UserRole;
    gender: Gender;
    email: string;
    yearOfBirth: number;
    info: string;
    subscriptionDate: Date;
    notificationPreference?: NotificationPreference;
    id: number;
    name: string;
    allowImpersonation?: boolean
    primarySite: string
    primaryRegion: string
};
