import { CourseBase } from '../CourseBase';
import { UserBase } from '../users/UserBase';

export type VerificationResult = {
    code : number;
    details : {
        closureDate : Date;
        course : CourseBase;
        student : UserBase;
        diplomaUrl : string;
    };
}