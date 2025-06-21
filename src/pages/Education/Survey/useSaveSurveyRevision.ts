import { SurveySettings } from '../../../types/data/SurveySettings';
import { ResponseError } from '../../../util/errors';
import { usePut } from 'sefer-fetch';

export const useSaveSurveyRevision = () => {
  const put = usePut();
  return async (survey: SurveySettings | undefined) => {
    if(survey === undefined) return;
    const { code } = await put(`/surveys/${survey.id}`, survey);
    switch (code) {
      case 202: return;
      case 404: throw new ResponseError(code, 'Could not find the survey that should be saved.');
      default: throw new ResponseError(code, 'Could not save the survey, an unexpected error occurred, please contact the developer.');
    }
  };
}
