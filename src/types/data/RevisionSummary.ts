import { ContentBlock } from 'types/data/ContentBlock';
import { CourseBase } from 'types/data/CourseBase';
import { LessonBase } from 'types/data/LessonBase';
import { Stage } from 'types/data/Stages';

interface RevisionSummary {
    allowSelfStudy: boolean,
    courseId: number
    course: CourseBase
    id: number
    predecessorId?: number
    stage: Stage
    surveyId? : number
    version?: number
    lessons: Lesson[]
}

type Lesson = LessonBase & {
    questions: ContentBlock[]
}

export type { Lesson, RevisionSummary };
