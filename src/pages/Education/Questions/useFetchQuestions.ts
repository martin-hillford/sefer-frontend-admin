import { useGet } from 'sefer-fetch';
import { RevisionSummary } from 'types/data/RevisionSummary';

export const useFetchQuestions = (revisionId : number) => {
  const revision = useGet<RevisionSummary>(`/courses/revision/${revisionId}/questions`);
  if (revision === null) throw new Error('Could not fetch the revision summary');
  return revision;
};

