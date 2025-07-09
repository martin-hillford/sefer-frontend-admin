import { useGet } from 'sefer-fetch';
import { SurveyResult } from 'types/data/enrollments/SurveyResult';

export const useFetchSurveyResult = (resultId: number) => {
  const result = useGet<SurveyResult>(`/surveys/results/${resultId}`);
  if (result === null) throw new Error( 'Could not load the survey result from the server, please contact the developer.');
  return result;
}

