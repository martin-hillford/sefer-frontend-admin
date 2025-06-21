import { EnrollmentBase } from './EnrollmentBase';

export type Enrollment = EnrollmentBase & {
    canStudentReEnroll : boolean;
    hasDiploma : boolean;
    diplomaUrl? : string;
}