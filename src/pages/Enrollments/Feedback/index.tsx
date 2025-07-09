import { Like } from 'sefer/icons';
import { JumbotronLayout } from 'sefer/components';
import { useEffect, useState } from 'react';
import { SurveyResult } from 'types/data/enrollments/SurveyResult';
import { Results } from './Results';
import { useFetchSurveyResults } from './useFetchSurveyResults';
import { usePostSurveyResultProcessed } from './usePostSurveyResultProcessed';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const [results, setResults] = useState<SurveyResult[] | null>(null);
  const [method, setMethod] = useState<'last' | 'more' | 'all'>('last');
  const fetchSurveyResults = useFetchSurveyResults();
  const postSurveyResultProcessed = usePostSurveyResultProcessed();
  const terms = useLocalization(localization);

  useEffect(() => {
    setResults(null);
    const limit = method === 'last' ? 5 : undefined;
    const all = method === 'all';
    fetchSurveyResults(limit, all).then(setResults);
  }, [method]);

  const crumbs = [
    { label: terms.enrollments, link: "/enrollments" },
    { label: terms.feedback}
  ];

  const onProcessed = async (result : SurveyResult) => {
    if (!results || !result) return;
    result.adminProcessed = true;
    if (method === 'all') setResults([...results]);
    else {
      const updated = results?.filter(r => r.id !== result.id);
      setResults(updated);
    }
    await postSurveyResultProcessed(result.id)
  };

  return (
    <JumbotronLayout overflow="auto" icon={<Like size={13} />} title={terms.feedback} subTitle={terms.whatStudentsThink} crumbs={crumbs}>
      <Results onProcessed={onProcessed} results={results} method={method} onMethodChange={setMethod} />
    </JumbotronLayout>
  );
};
