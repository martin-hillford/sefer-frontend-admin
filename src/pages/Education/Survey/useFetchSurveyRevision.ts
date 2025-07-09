import { useGet } from 'sefer-fetch';
import { SurveySettings } from '../../../types/data/SurveySettings';

export const useFetchSurveyRevision = (revisionId : number) => {
  const revision = useGet<SurveySettings>(`/courses/revision/${revisionId}/survey`);
  if (revision === null) throw new Error('Could not fetch the survey for the provided revision');
  return revision;
};
