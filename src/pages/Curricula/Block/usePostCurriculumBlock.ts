import { ResponseError } from 'util/errors';
import { PostBlock } from 'types/data/curricula/Revision';
import { usePost } from 'sefer-fetch';

export const usePostCurriculumBlock = () => {
  const post = usePost();
  return async (block : PostBlock) => {
    const { code } = await post('/courses/curricula/blocks', block);
    if (code === 201) return true;
    throw new ResponseError(code, 'Could not save the curriculum block to the server, please try again, if the problem persists please contact the developer.');
  };

}
