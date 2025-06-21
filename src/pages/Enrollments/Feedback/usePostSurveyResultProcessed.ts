import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePostSurveyResultProcessed = () => {
  const post = usePost();
  return async (resultId : number ) => {
    const { code } = await post(`/surveys/results/${resultId}/processed`, {});
    if (code === 204) return true;
    throw new ResponseError(code, 'Could not set the survey as admin processed, please contact the developer.');
  };
};
