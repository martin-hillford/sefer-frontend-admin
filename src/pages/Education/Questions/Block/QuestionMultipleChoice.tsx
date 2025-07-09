import { Bold, Boolean, Grid, GridColumn, Line } from 'sefer/components';
import { Choice } from 'types/data/Choice';
import { ContentBlock } from 'types/data/ContentBlock';
import { Question } from './Question';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const QuestionMultipleChoice = (props : { block : ContentBlock}) => {
  const { block } = props;
  return (
    <>
      <Question block={block} />
      <Choices choices={block.choices} />
    </>
  );
};

const Choices = (props : { choices : Choice[] | undefined}) => {
  const { choices } = props;
  const terms = useLocalization(localization);
  if (!choices) return null;
  return (
    <>
      <Grid wrap={false}>
        <GridColumn $size={90}><Bold>{terms.choice}</Bold></GridColumn>
        <GridColumn $align="right" $size={10}><Bold>{terms.correct}</Bold></GridColumn>
      </Grid>
      {choices && choices.map(c => <ChoiceBlock key={c.id} choice={c} />) }
      <Line />
    </>
  );
};

const ChoiceBlock = (props : { choice : Choice}) => {
  const { choice } = props;
  return (
    <Grid wrap={false}>
      <GridColumn $size={95}>{choice.answer} </GridColumn>
      <GridColumn $align="right" $size={10}>
        <Boolean value={choice.isCorrectAnswer === true} colored={false} size={14} />
      </GridColumn>
    </Grid>
  );
};
