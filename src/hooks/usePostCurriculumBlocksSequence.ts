import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePostCurriculumBlocksSequence = () => {
  const post = usePost();
  return async (args : { curriculumId : number, year : number, blocks : number[] }) => {
    const { code } = await post('/courses/curricula/blocks/sequence', args);
    if (code === 202) return true;
    throw new ResponseError(code, 'Could not save the sequence of the blocks of the curriculum to the server, please try again, if the problem persists please contact the developer.');
  };
}
