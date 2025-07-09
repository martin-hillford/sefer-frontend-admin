import { ResponseError } from 'util/errors';
import { PostBlock } from 'types/data/curricula/Revision';
import { usePut } from 'sefer-fetch';

export const usePutCurriculumBlock = () => {
  const put = usePut();
  return async (block: PostBlock) => {
    const { code } = await put(`/courses/curricula/blocks/${block.id}`, block);
    if (code === 202) return true;
    throw new ResponseError(code, 'Could not save the curriculum block to the server, please try again, if the problem persists please contact the developer.');
  };
}
