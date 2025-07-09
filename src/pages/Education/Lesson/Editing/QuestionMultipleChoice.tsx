import { ErrorText, Property, Switch } from 'sefer/components';
import { BlockProps } from './BlockProps';
import { TextEditor } from './TextEditor';
import { Choices } from './Choices';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const QuestionMultipleChoice = (props : BlockProps) => {
  const { block } = props;
  const terms = useLocalization(localization);
  const error = block.getError('content');

  return (
    <>
      <Switch label={terms.multiCorrect} name="isMultiSelect" dataContext={block} />

      <Property label={terms.answerExplanation} />
      <TextEditor name="answerExplanation" block={block} />

      <Property label={terms.question} error={error} flex={-1}>
        {!!error && <ErrorText>{error}</ErrorText>}
      </Property>
      <TextEditor name="content" block={block} />
      <Choices block={block} />
    </>
  );
};
