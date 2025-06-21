import { CourseBase } from '../CourseBase';
import { UserBase } from './UserBase';

export type MentorCourses = UserBase & {
    courses : CourseBase[],
    availableCourses : CourseBase[],
}