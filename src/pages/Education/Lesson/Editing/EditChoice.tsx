import { Button, Switch, TextField } from 'sefer/components';
import { Minus } from 'sefer/icons';
import { Choice } from 'types/data/Choice';
import { isEmpty } from 'util/validation';
import { Row } from './Row';

interface ChoiceProps {
  choice: Choice,
  error: boolean,
  setChoice: (choice : Choice) => void,
  onRemoveChoice: (choice : Choice) => void,
}

export const EditChoice = (props: ChoiceProps) => {
  const { choice, error, setChoice, onRemoveChoice } = props;

  const onChangeSwitch = (value: boolean) => setChoice({ ...choice, isCorrectAnswer: value });

  const onChangeText = (value: string) => setChoice({ ...choice, answer: value });

  const onRemove = () => onRemoveChoice(choice);

  return (
    <Row>
      <div>
        <TextField
          name={`choices_${choice.id}`}
          value={choice.answer}
          onChange={onChangeText}
          error={error && isEmpty(choice.answer)}
        />
      </div>
      <div><Switch value={choice.isCorrectAnswer} onChange={onChangeSwitch} /></div>
      <div><Button onClick={onRemove} variant="danger" icon={<Minus size={16} />} /></div>
    </Row>
  );
};
