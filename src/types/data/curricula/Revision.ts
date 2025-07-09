import { CourseBase } from '../CourseBase';
import { Stage } from '../Stages';
import { CurriculumBase } from './CurriculumBase';

export type CurriculumWithRevisions = CurriculumBase & {
    editingRevision: Revision;
    publishedRevision?: Revision;
}

export type Revision = {
    id: number;
    stage: Stage;
    useYears: boolean;
    version: number;
    years: number;
    blocks? : Block[];
}

export type Block = {
    year? : number;
    sequenceId?: number;
    name: string;
    description?: string;
    id: number;
    availableCourses?: CourseBase[];
    courses?: CourseBase[];
}

export interface PostBlock {
    id: number
    name: string
    description: string | undefined
    curriculumId: number
    courses: number[]
    year: number | undefined
}
