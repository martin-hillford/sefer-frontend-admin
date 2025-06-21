import { User } from './User';

export type Mentor = User & {
    activeStudents : number;
    preferredStudents : number;
    ratingCount : number;
    rating : number;
    maximumStudents : number;
}