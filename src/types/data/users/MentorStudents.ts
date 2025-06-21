import { User } from './User';

export type MentorStudents = {
    students : MentorStudent[];
    mentor: User;
}

export type MentorStudent = User & {
    course? : string | null;
    completedLessons? : number | null;
    reviewedLessons? : number | null;
}