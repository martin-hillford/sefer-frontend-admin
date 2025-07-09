import { CourseDictionary, Word } from 'types/data/CourseDictionary';
import { usePost } from 'sefer-fetch';
import { ButtonGroup, SaveButton } from 'sefer/components';

export const Buttons = (props : { dictionary: CourseDictionary, words: Word[], onValidate: () => Promise<boolean> }) => {
  const { dictionary, words, onValidate } = props;
  const post = usePost<boolean>();

  const onSave = async () => {
    const body = { ...dictionary, words };
    const result = await post(`/courses/revision/${dictionary.courseRevisionId}/dictionary`, body);
    return result.code === 202;
  }

  return (
    <ButtonGroup $pull="right">
      <SaveButton onSave={onSave} onValidate={onValidate} />
    </ButtonGroup>
  )
}
