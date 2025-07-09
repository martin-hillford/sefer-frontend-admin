import { Button, EntitiesPanel, EntityForm } from 'sefer/components';
import { CourseDictionary, Word } from 'types/data/CourseDictionary';
import { useState } from 'react';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { uuid } from 'sefer-fetch';
import styles from './dictionary.module.css';
import { Details } from './Details';
import { Minus } from 'sefer/icons';
import { isEmpty } from 'sefer/util/isEmpty';
import { Buttons } from './Buttons';

export const Content = (props : { dictionary: CourseDictionary }) => {
  const { dictionary } = props;
  const [ words, setWords ] = useState(dictionary.words);
  const [ selected, setSelected ] = useState<Word>();
  const terms = useLocalization(localization);
  const [ showValidation, setShowValidation ] = useState(false);

  const onAdd = () => {
    const valid = isValid();
    setShowValidation(!valid);
    if(!valid) return;

    const newWord = { word: null, id: uuid(), explanation: '', pictureUrl: '', language: 'en' };
    setWords([...words, newWord]);
    setSelected(newWord);
  }

  const setWord = (word: Word) => {
    const except = words.filter(w => w.id !== word.id);
    setWords([...except, word]);
    setSelected(word);
  }

  const getLabel = (word: Word) => {
    if(word.word === '') return terms.newWord;
    return word.word ?? terms.newWord;
  }

  const onDeleted = () => {
    if(!selected) return;
    const updated = words.filter(w => w.id !== selected.id);
    setWords(updated);
    if(updated.length > 0) setSelected(updated[0]);
    else setSelected(undefined);
  }

  const isValid = () => {
    if(!selected) return true;
    return !isEmpty(selected.word) && !isEmpty(selected.explanation);
  }

  const onSelectionChange = (word: Word | undefined) => {
    if(word?.id === selected?.id) return;

    const valid = isValid();
    setShowValidation(!valid);
    setSelected(valid ? word : selected);
    if(!valid) return false;
  }

  const onValidate = async () => {
    const valid = isValid();
    setShowValidation(!valid);
    return valid;
  }

  const icon = <Minus size={16} />
  const DeleteButton = () => <Button label={terms.remove} variant="danger" icon={icon} onClick={onDeleted} />;

  return (
    <EntitiesPanel<Word>
      data={words}
      selected={selected}
      name="words"
      header={terms.dictionary}
      onSelect={onSelectionChange}
      onGetLabel={getLabel}
      onAdd={onAdd}
      additionalButtons={<DeleteButton />}
    >
      <EntityForm buttons={<Buttons onValidate={onValidate} words={words} dictionary={dictionary} />}>
        {words.length === 0 && <div className={styles.noWords}>{terms.empty}</div>}
        <Details setWord={setWord} selected={selected} showValidation={showValidation} />
      </EntityForm>
    </EntitiesPanel>
  );
}

