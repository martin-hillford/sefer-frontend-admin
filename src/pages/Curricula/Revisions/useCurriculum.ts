import { Block } from 'types/data/curricula/Revision';
import { useFetchCurriculumRevision } from 'hooks/useFetchCurriculumRevision';
import { useDeleteCurriculumBlock } from 'hooks/useDeleteCurriculumBlock';
import { usePostCurriculumBlocksSequence } from 'hooks/usePostCurriculumBlocksSequence';
import { usePublishCurriculumRevision } from './usePublishCurriculumRevision';
import { useCloseCurriculumRevision } from './useCloseCurriculumRevision';

export const useCurriculum = (id : number) => {
  const deleteCurriculumBlock = useDeleteCurriculumBlock();
  const publishRevision = usePublishCurriculumRevision();
  const closeRevision = useCloseCurriculumRevision();
  const postSequence = usePostCurriculumBlocksSequence();
  const [ curriculum, refresh ] = useFetchCurriculumRevision( id);

  const publish = async () => publishRevision(curriculum?.editingRevision?.id);

  const close = async () => closeRevision(curriculum?.publishedRevision?.id);

  const sorted = async (blocks : Block[]) => {
    if(curriculum?.id === undefined) return false;
    const args = { curriculumId: curriculum?.id, year: 0, blocks: blocks.map(b => b.id) };
    return await postSequence(args);
  };

  const deleteBlock = async (block? : Block) => {
    if (!block?.id) return false;
    return deleteCurriculumBlock(block?.id);
  };

  return { curriculum, publish, refresh, close, sorted, deleteBlock };
};
