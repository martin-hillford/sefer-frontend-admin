import { CourseBase } from './CourseBase';
import { NamedEntity } from './Entity';

export type CourseMentors = CourseBase & {
    available : NamedEntity[]
    assigned : NamedEntity[]
}