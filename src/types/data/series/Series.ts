import { CourseBase } from '../CourseBase';
import { Level } from '../Level';

export type Series = {
    id: number,
    name: string,
    description: string,
    level: Level,
    isPublic: boolean
}

export type SeriesWithCourse = Series & {
    includedCourses: CourseBase[];
    availableCourses: CourseBase[];
}