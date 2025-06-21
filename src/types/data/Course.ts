import { CourseBase } from './CourseBase';

export type Course = CourseBase & {
    isDeletable? : boolean
}
