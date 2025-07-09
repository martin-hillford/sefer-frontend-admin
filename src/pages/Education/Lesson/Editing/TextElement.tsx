import { ErrorText, Line, Property } from 'sefer/components';
import { BlockProps } from './BlockProps';
import { TextEditor } from './TextEditor';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const TextElement = (props : BlockProps) => {
  const { block } = props;
  const terms = useLocalization(localization);

  const error = block.getError('content');
  return (
    <>
      <Property label={terms.text} error={error} flex={-1}>
        {!!error && <ErrorText>{error}</ErrorText>}
      </Property>
      <Line $margin={10} />
      <TextEditor name="content" block={block} />
    </>
  );
};
