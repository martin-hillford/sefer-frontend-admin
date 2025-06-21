import Region from '../resources/Region';
import { UserBase } from './UserBase';

export type MentorRegion = UserBase & {
    regions : Region[],
    availableRegions : Region[],
}