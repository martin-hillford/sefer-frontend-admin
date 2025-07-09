import { Block, CurriculumWithRevisions } from 'types/data/curricula/Revision';

export type RevisionProps = {
    curriculum : CurriculumWithRevisions;
    publish: () => Promise<boolean>;
    refresh: () => void;
    close: () => Promise<boolean>;
    sorted: (blocks: Block[]) => Promise<boolean>;
    deleteBlock: (block? : Block) => Promise<boolean>;
}
