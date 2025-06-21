import { BackNoSaveButton, Button, ButtonGroup, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { BlogWithContent } from 'types/data/resources/BlogWithContent';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Actions = (props: { context: DataContext<BlogWithContent>, onSaveBlog: () => Promise<void> }) => {
  const { context, onSaveBlog } = props;
  const terms = useLocalization(localization);
  const [state, setState] = useState('default');
  const toDefault = () => setState('default');

  const onSave = async () => {
    if (!await context.validate()) return;
    setState('saving');
    await onSaveBlog();
    setState('saved');
  };

  return (
    <ButtonGroup $pull="right">
      <BackNoSaveButton context={context} url="/content/blogs" />
      <Button variant="primary" onClick={onSave}>{terms.save}</Button>
      <SavingAlert show={state === 'saving'} content={terms.savingAlert} />
      <SavedAlert show={state === 'saved'} content={terms.savedAlert} onClosed={toDefault} />
    </ButtonGroup>
  );
};
