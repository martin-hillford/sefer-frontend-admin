import { Bold, Boolean, Italic } from 'sefer/components';
import { ContentBlockType } from 'types/data/ContentBlockType';
import { CorrectedAnswer } from 'types/data/users/CorrectedAnswer';
import { clean } from 'util/html';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { ContentBlockTypeLabel } from '../../../components';

export const AnswerCard = (props : { answer : CorrectedAnswer }) => {
  const { answer } = props;
  const terms = useLocalization(localization);
  return (
    <div>
      <Bold>{terms.questionHeader.replace('@header',answer.questionHeader)}</Bold>&nbsp;
      <Italic><ContentBlockTypeLabel type={answer.questionType} /></Italic>
      <div dangerouslySetInnerHTML={{ __html: clean(answer.questionText) }} />
      <br />
      <Bold>{terms.providedAnswer}</Bold>
      <AnswerGiven {...props} />
      <CorrectAnswerBlock {...props} />
    </div>
  );
};

const AnswerGiven = (props : { answer : CorrectedAnswer }) => {
  const { answer } = props;
  const getBooleanText = useGetBooleanText();
  const getChoice = useGetChoice();
  switch (answer.questionType) {
    case ContentBlockType.QuestionMultipleChoice:
      return <div>{getChoice(answer.questionChoices, answer.givenAnswer)}</div>;
    case ContentBlockType.QuestionBoolean:
      return <div>{getBooleanText(answer.givenAnswer)}</div>;
    default:
      return <div><Text given={answer.givenAnswer} /></div>;
  }
};

const CorrectAnswerBlock = (props : { answer : CorrectedAnswer }) => {
  const { answer } = props;
  const terms = useLocalization(localization);
  if (answer.questionType === ContentBlockType.QuestionOpen) return null;
  return (
    <>
      <br />
      <Bold>{terms.correctAnswer}</Bold>
      <CorrectAnswer {...props} />
      <br />
      <Bold>{terms.result}</Bold>&nbsp;<Boolean size={20} value={answer.isValid === true} colored />
    </>
  );
};

const CorrectAnswer = (props : { answer : CorrectedAnswer }) => {
  const { answer } = props;
  const getChoice = useGetChoice();
  const getBooleanText = useGetBooleanText();
  switch (answer.questionType) {
    case ContentBlockType.QuestionMultipleChoice:
      return <div>{getChoice(answer.questionChoices, answer.correctAnswer)}</div>;
    case ContentBlockType.QuestionBoolean:
      return <div>{getBooleanText(answer.correctAnswer)}</div>;
    default:
      return <div>{answer.correctAnswer}</div>;
  }
};

const useGetChoice = () => {
  const terms = useLocalization(localization);
  return (choices: { [key: string]: number }[] | null | undefined, selected: string | number) => {
    const key = getInteger(selected);
    if (key === null || !choices) return null;
    return <>{choices[key]}</> || <Italic>{terms.noAnswerGiven}</Italic>;
  };
}

const getInteger = (value: number | string | undefined | null) => {
  if(Number.isInteger(value)) return value as number;
  if(value === null || value === undefined) return null;
  const parsed = parseInt(value as string);
  if(Number.isNaN(parsed)) return null;
  return parsed;
}

const useGetBooleanText = () => {
  const terms = useLocalization(localization);
  return (bool : string) => {
    if (bool === 'Wrong') return terms.incorrect
    return terms.correct
  };
}

const Text = (props: {given : string}) => {
  const terms = useLocalization(localization);
  const { given } = props;
  if (given) return given;
  return <Italic>{terms.noAnswerGiven}</Italic>;
}
