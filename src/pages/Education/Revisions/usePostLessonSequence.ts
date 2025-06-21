import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePostLessonSequence = () => {
  const post = usePost();
  return async (courseRevisionId : number, lessons : number[]) => {
    const url = `/courses/revision/${courseRevisionId}/lesson-sequence`;
    const { code } = await post(url, lessons);
    if (code === 202) return;
    throw new ResponseError(code, 'A fatal error occurred while saving the sequence of the lessons. Please contact the developer');
  };
}




