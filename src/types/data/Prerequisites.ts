import { CourseBase } from './CourseBase';
import { NamedEntity } from './Entity';

export type Prerequisites = CourseBase & {
    availableCourses : NamedEntity[]
    requiredCourses : NamedEntity[]
}