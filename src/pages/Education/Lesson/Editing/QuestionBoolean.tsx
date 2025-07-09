import { ErrorText, Line, Property, Switch } from 'sefer/components';
import { BlockProps } from './BlockProps';
import { TextEditor } from './TextEditor';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const QuestionBoolean = (props : BlockProps) => {
  const { block } = props;
  const error = block.getError('content');
  const terms = useLocalization(localization);

  return (
    <>
      <Switch label={terms.answer} name="boolAnswer" dataContext={block} />

      <Property label={terms.answerExplanation} />
      <TextEditor name="answerExplanation" block={block} />
      
      <Property label={terms.question} error={error} flex={-1}>
        {!!error && <ErrorText>{error}</ErrorText>}
      </Property>
      <Line $margin={10} />
      <TextEditor name="content" block={block} />
    </>
  );
};
