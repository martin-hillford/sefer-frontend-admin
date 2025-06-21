import { ResponseError } from 'util/errors';
import { Block } from 'types/data/curricula/Revision';
import { useGetAsync } from 'sefer-fetch';

export const useFetchCurriculumBlock = () => {
  const get = useGetAsync<Block>();
  return async (blockId : number) => {
    const { code, body } = await get(`/courses/curricula/blocks/${blockId}`);
    if (code === 200) return body!;
    throw new ResponseError(code, 'Could not load the block of the curriculum from the server, please try again, if the problem persists please contact the developer.');
  };
};
