import { Block, CurriculumWithRevisions as Curriculum } from 'types/data/curricula/Revision';
import { CourseBase } from 'types/data/CourseBase';
import { DataContext } from 'sefer/types/DataContext';

export type BlockProps = {
    curriculum: Curriculum;
    block: DataContext<Block>;
    courses: CourseBase[];
    loaded: boolean;
    year: number | undefined;
    save: () => Promise<boolean>;
}
