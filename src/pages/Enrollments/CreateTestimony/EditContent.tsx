import { Bold, ErrorText, TextArea } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const EditContent = (props : { content : string, error : string | null, onContentChange : (c : string) => void}) => {
  const { content, onContentChange, error } = props;
  const terms = useLocalization(localization);
  return (
    <>
      {!error && <Bold>{terms.testimony}</Bold>}
      {error && <Bold><ErrorText>{terms.testimony}</ErrorText></Bold>}
      <br />
      <TextArea name="content" error={error} value={content} onChange={onContentChange} />
    </>
  );
};
