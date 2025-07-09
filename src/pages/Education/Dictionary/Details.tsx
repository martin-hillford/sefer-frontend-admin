import { Word } from 'types/data/CourseDictionary';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { TextArea, TextField } from 'sefer/components';
import { UrlSelector } from 'components/UrlSelector';
import { isEmpty } from 'sefer/util/isEmpty';

export const Details = (props : { showValidation: boolean, selected: Word | undefined, setWord: (word: Word) => void }) => {
  const { selected, setWord, showValidation } = props;
  const terms = useLocalization(localization);

  const onUrlChange = (url: string) => {
    if(!selected) return;
    setWord({...selected, pictureUrl: url});
  }

  const wordError = showValidation && isEmpty(selected?.word) ? terms.emptyWord : undefined;
  const explanationError = showValidation && isEmpty(selected?.explanation) ? terms.emptyExplanation : undefined;

  if(!selected) return null;
  return (
    <>
      <TextField
        label={terms.word}
        name="word"
        value={selected.word}
        error={wordError}
        onChange={(value: string) => setWord({...selected, word: value})}
      />
      <TextArea
        label={terms.explanation}
        name="explanation"
        error={explanationError}
        value={selected.explanation}
        onChange={(value: string) => setWord({...selected, explanation: value})}
      />
      <UrlSelector
        label={terms.picture}
        name="pictureUrl"
        value={selected.pictureUrl}
        onChange={onUrlChange}
      />
    </>
  )
}
