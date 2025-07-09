import { Column, Header, Loading, ScrollPanel, TwoColumns } from 'sefer/components';
import { SurveyResultView } from 'components';
import { useNavigate } from 'react-router-dom';
import { Form } from './Form';
import { useFetchSurveyResult } from './useFetchSurveyResult';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Content = (props : { resultId : number }) => {
  const { resultId } = props;
  const result = useFetchSurveyResult(resultId);
  const navigate = useNavigate();
  const terms = useLocalization(localization);

  if (!result) return <Loading variant="huge" />;
  if (result.adminProcessed) navigate('/enrollments/feedback');

  return (
    <TwoColumns>
      <Column $side="left">
        <ScrollPanel>
          <Header variant="large" inline={false}>{terms.newTestimony}</Header>
          <Form result={result} />
        </ScrollPanel>
      </Column>
      <Column $side="right">
        <ScrollPanel>
          <Header variant="large" inline={false}>{terms.feedback}</Header>
          <SurveyResultView result={result} />
        </ScrollPanel>
      </Column>
    </TwoColumns>
  );
};
