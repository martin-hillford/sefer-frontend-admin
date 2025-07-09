import { CourseBase } from '../CourseBase';

export type EnrollmentBase = {
    accountabilityPartnerId? : number;
    closureDate? : Date;
    course : CourseBase;
    enrollmentDate? : Date;
    grade? : number;
    hasLessons : boolean;
    id : number;
    imported : boolean;
    isActive : boolean;
    isCourseCompleted : boolean;
    isSelfStudy : boolean;
    lessonCompletedCount : number
    lessonCount : number
    mentorId? : number;
    mentorName? : string;
    onPaper : boolean;
    progress: number;
}