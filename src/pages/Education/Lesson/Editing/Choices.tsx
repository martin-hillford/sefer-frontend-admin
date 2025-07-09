import { Bold, Button, ButtonGroup, ErrorText, Italic, Line, Property } from 'sefer/components';
import { Plus } from 'sefer/icons';
import { Choice } from 'types/data/Choice';
import { DataContext } from 'sefer/types/DataContext';
import { ContentBlockTyped } from './ContentBlockTyped';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { EditChoice } from './EditChoice';
import { Row } from './Row';

const getEmptyId = (choices?: Choice[]) => {
  if (!choices || choices.length === 0) return -1;
  // eslint-disable-next-line prefer-spread
  const provisional = Math.min.apply(Math, choices.map(c => c.id)) - 1;
  return Math.min(-1, provisional);
};

export const Choices = (props: { block: DataContext<ContentBlockTyped> }) => {
  const terms = useLocalization(localization);
  const { block } = props;
  const { choices } = block.data;

  const onSetChoices = (updated: Choice[]) => block.setValue('choices', updated);

  const setChoice = (choice: Choice) => {
    const index = choices?.findIndex(c => c.id === choice.id);
    if (index === undefined || !choices) return;
    choices[index] = choice;
    onSetChoices(choices.map(c => ({ ...c })));
  };

  const onRemoveChoice = (choice: Choice) => {
    if (choices) onSetChoices(choices.filter(c => c.id !== choice.id));
  };

  const onAddChoice = () => {
    const choice = { id: getEmptyId(choices), isCorrectAnswer: false, answer: '' };
    if (!choices) onSetChoices([choice]);
    else onSetChoices([...choices, choice]);
  };

  const hasChoices = !!choices && choices.length !== 0;
  const error = block.getError('choices');

  return (
    <>
      <Line $margin={10} />
      <Property label={terms.choices} error={error} flex={-1}>
        {!!error && <ErrorText>{error}</ErrorText>}
      </Property>
      <Line $margin={10} />
      {!hasChoices && <Italic>{terms.noChoicesProvided}</Italic>}
      {hasChoices && <Header choiceLabel={terms.choice} correctLabel={terms.correct} />}
      {choices?.map(c => (
        <EditChoice
          key={c.id}
          onRemoveChoice={onRemoveChoice}
          setChoice={setChoice}
          choice={c}
          error={!!error}
        />
      ))}
      <ButtonGroup $pull="right">
        <Button onClick={onAddChoice} icon={<Plus size={16} />} />
      </ButtonGroup>
      <Line $margin={10} />
    </>
  );
};

const Header = (props : { choiceLabel: string, correctLabel: string }) => (
  <Row className="header">
    <div><Bold>{props.choiceLabel}</Bold></div>
    <div><Bold>{props.correctLabel}</Bold></div>
    <div />
  </Row>
);
