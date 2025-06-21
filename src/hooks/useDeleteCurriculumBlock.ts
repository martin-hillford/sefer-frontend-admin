import { ResponseError } from 'util/errors';
import { useDelete } from 'sefer-fetch';

export const useDeleteCurriculumBlock = () => {
  const del = useDelete();
  return async (blockId: number) => {
    const { code } = await del(`/courses/curricula/blocks/${blockId}`, {});
    if (code !== 204) throw new ResponseError(code, 'Could not deleted the block of the curriculum');
    return true;
  };
}
