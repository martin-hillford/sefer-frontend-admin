import { ContentBlock } from './ContentBlock';
import { CourseBase } from './CourseBase';
import { LessonBase } from './LessonBase';
import { Revision } from './Revision';

export type Lesson = LessonBase & {
    course : CourseBase,
    courseRevision : Revision,
    content : ContentBlock[],
    previewQuery?: string | undefined | null
}
