import { useEffect, useState } from 'react';
import { Block } from 'types/data/curricula/Revision';
import { useFetchCurriculumRevision } from 'hooks/useFetchCurriculumRevision';
import { usePostCurriculumBlocksSequence } from 'hooks/usePostCurriculumBlocksSequence';
import { useDeleteCurriculumBlock } from 'hooks/useDeleteCurriculumBlock';

export const useYears = (curriculumId: number, year: number) => {
  const [ curriculum, refresh ] = useFetchCurriculumRevision( curriculumId);
  const [blocks, setBlocks] = useState<Block[] | undefined>();
  const postSequence = usePostCurriculumBlocksSequence();
  const deleteCurriculumBlock = useDeleteCurriculumBlock();

  useEffect(() => {
    const filtered = !curriculum?.editingRevision?.blocks ? [] : curriculum.editingRevision.blocks.filter(b => b.year === year);
    setBlocks(filtered);
  }, [curriculum, year]);

  const deleteBlock = async (blockId : number) => await deleteCurriculumBlock(blockId);

  const sorted = async (sorting : Block[]) => {
    if(curriculum?.id === undefined) return false;
    const args = { curriculumId: curriculum.id, year, blocks: sorting.map(b => b.id) };
    return await postSequence(args);
  };

  return { curriculum, blocks, deleteBlock, refresh, sorted, setBlocks };
};
