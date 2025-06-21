import { ErrorText, Line, Property } from 'sefer/components';
import { BlockProps } from './BlockProps';
import { TextEditor } from './TextEditor';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const QuestionOpen = (props : BlockProps) => {
  const { block } = props;
  const error = block.getError('content');
  const terms = useLocalization(localization);

  return (
    <>
      <Property label={terms.question} error={error} flex={-1}>
        {!!error && <ErrorText>{error}</ErrorText>}
      </Property>
      <Line $margin={10} />
      <TextEditor block={block} />
    </>
  );
};
