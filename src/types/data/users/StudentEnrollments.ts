import { Enrollment } from '../enrollments/Enrollment';
import { Student } from './Student';

export type StudentEnrollments = {

    student : Student;
    enrollments : Enrollment[]
}