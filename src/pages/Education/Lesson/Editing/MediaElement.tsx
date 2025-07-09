import { Bold, Line, TextField } from 'sefer/components';
import { ContentBlock } from 'types/data/ContentBlock';
import { DataContext } from 'sefer/types/DataContext';
import { TextEditor } from './TextEditor';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const MediaElement = (props : { block : DataContext<ContentBlock> }) => {
  const { block } = props;
  const terms = useLocalization(localization)
  return (
    <>
      <TextField label={terms.url} name="url" dataContext={block} />
      <Bold>{terms.caption}</Bold>
      <Line $margin={10} />
      <TextEditor name="content" block={block} />
    </>
  );
};
