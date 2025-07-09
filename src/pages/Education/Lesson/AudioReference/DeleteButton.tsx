import { DeleteButton } from 'sefer/components';
import { Lesson } from 'types/data/Lesson';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { useDeleteAudio } from './useDeleteAudio';

export const DeleteAudioButton = (props : { context : DataContext<Lesson> }) => {
  const { context } = props;
  const deleteAudio = useDeleteAudio();
  const terms = useLocalization(localization).audioDeleteButton;

  const onDelete = async () => {
    const response = await deleteAudio(context.data.id);
    return response.ok;
  };

  const onDeleted = () => {
    context.setValue('audioReferenceId', undefined);
  };

  return (
    <DeleteButton
      disabled={!context?.data?.audioReferenceId}
      onClosed={onDeleted}
      onDelete={onDelete}
      {...terms}
    />
  );
};
