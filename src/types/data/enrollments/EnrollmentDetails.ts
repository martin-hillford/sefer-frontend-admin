import { EnrollmentBase } from './EnrollmentBase';
import { Submission } from '../users/Submission';
import { User } from '../users/User';

export type EnrollmentDetails = EnrollmentBase & {
    submissions: Submission[];
    student : User;
    hasDiploma : boolean;
    diplomaUrl? : string;
}