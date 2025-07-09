import { Button, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { Testimony } from 'types/data/resources/Testimony';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePostTestimony } from './usePostTestimony';
import { usePutTestimony } from './usePutTestimony';

export const SaveAction = (props : { context : DataContext<Testimony>}) => {
  const { context } = props;
  const [state, setState] = useState('default');
  const terms = useLocalization(localization);
  const postTestimony = usePostTestimony();
  const putTestimony = usePutTestimony();

  const onClosed = () => {
    setState('default');
    context.resetHasChanges();
  };

  const onSave = async () => {
    if (!await context.validate()) return;
    setState('saving');
    if (context.data.id > 0) await putTestimony(context.data);
    else context.set(await postTestimony(context.data));
    setState('saved');
  };

  return (
    <>
      <Button onClick={onSave} variant="primary">{terms.saveButton}</Button>
      <SavingAlert show={state === 'saving'} content={terms.savedAlertContent} />
      <SavedAlert show={state === 'saved'} content={terms.savedAlertContent} onClosed={onClosed} />
    </>
  );
};
