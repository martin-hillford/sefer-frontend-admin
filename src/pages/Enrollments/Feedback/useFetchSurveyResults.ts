import { ResponseError } from 'util/errors';
import { SurveyResult } from 'types/data/enrollments/SurveyResult';
import { useGetAsync } from 'sefer-fetch';

export const useFetchSurveyResults = () => {
  const get = useGetAsync<SurveyResult[]>();
  return async (limit? : number, all? : boolean) => {
    let url = all ? '/surveys/results' : '/surveys/unprocessed-results';
    if (limit) url = `${url}?limit=${limit}`;
    const { code, body } = await get(url);
    if (code === 200) return body!;
    throw new ResponseError(code, 'Could not load the surveys from the server, please contact the developer.');
  };
}

