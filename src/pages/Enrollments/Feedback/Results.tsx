import { Button, ButtonGroup, Cards, Container, EntitiesNotFound, Header, Line, Loading } from 'sefer/components';
import { SurveyResult } from 'types/data/enrollments/SurveyResult';
import { Result } from './Result';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  results : SurveyResult[] | null,
  onMethodChange : (method: 'last' | 'more' | 'all') => void,
  method : 'last' | 'more' | 'all',
  onProcessed : (r: SurveyResult) => void
}


export const Results = (props : Props) => {
  const { results, onMethodChange, method, onProcessed } = props;
  const terms = useLocalization(localization);

  if (!results) return <Loading variant="huge" />;
  if (results?.length === 0) return <EntitiesNotFound header={terms.feedback} content={terms.noFeedback} />

  const onRender = (result : SurveyResult) => <Result onProcessed={onProcessed} result={result} />;
  return (
    <Container>
      <Header inline={false} variant="large">{terms.incomingFeedback}</Header>
      <p>{terms.endOfCourseFeedback}</p>
      <Line />
      <Cards entities={results} onRender={onRender} />
      <Line />
      <ButtonGroup>
        {method !== 'last' && <Button onClick={() => { onMethodChange('last'); }}>{terms.latestFeedback}</Button> }
        {method !== 'more' && <Button onClick={() => { onMethodChange('more'); }}>{terms.moreFeedback}</Button> }
        {method !== 'all' && <Button onClick={() => { onMethodChange('all'); }}>{terms.allFeedback}</Button> }
      </ButtonGroup>
    </Container>
  );
};
