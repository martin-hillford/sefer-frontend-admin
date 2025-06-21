import { CourseBase } from '../CourseBase';
import { UserBase } from '../users/UserBase';

export type SurveyResult = {
    id : number;
    mentor? : UserBase;
    student: UserBase;
    course: CourseBase;
    mentorRating? : number;
    courseRating? : number;
    text? : string;
    socialPermissions : boolean;
    selfStudy? : boolean;
    adminProcessed? : boolean;
    closureDate? : Date;
}