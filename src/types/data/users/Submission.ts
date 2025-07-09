import { CorrectedAnswer } from './CorrectedAnswer';

export type Submission = {
    course : string;
    courseId : number;
    enrollmentId : number;
    id : number;
    lesson : string;
    lessonId : number;
    student : string;
    studentId : number;
    submissionDate : Date;
    reviewDate? : Date;
    reviewedByMentor? : boolean;
    answers : CorrectedAnswer[];
}