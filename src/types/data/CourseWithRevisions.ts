import { CourseBase } from './CourseBase';
import { LessonBase } from './LessonBase';
import { Revision } from './Revision';

export type CourseWithRevisions = CourseBase & {
    publishedRevision : Revision | null | undefined,
    editingRevision : Revision & {
        lessons : LessonBase[]
    }
}