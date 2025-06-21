import { Level } from '../Level';
import { Stage } from '../Stages';

export type CurriculumBase = {
    id: number;
    name: string;
    permalink?: string;
    description?: string;
    level?: Level;
    stage: Stage;
    isEditable: boolean;
}