import { BackNoSaveButton, Button, ButtonGroup, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { PageWithContent } from 'types/data/resources/PageWithContent';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Actions = (props: { context: DataContext<PageWithContent>, onSavePage: () => void }) => {
  const { onSavePage, context } = props;
  const [state, setState] = useState('default');
  const toDefault = () => setState('default');
  const terms = useLocalization(localization);

  const onSave = async () => {
    if (!await context.validate()) return;
    setState('saving');
    onSavePage();
    setState('saved');
  };

  return (
    <ButtonGroup $pull="right">
      <BackNoSaveButton context={context} url="/content/pages" />
      <Button variant="primary" onClick={onSave}>Opslaan</Button>
      <SavingAlert show={state === 'saving'} content={terms.savingInProgress} />
      <SavedAlert show={state === 'saved'} content={terms.savedSuccess} onClosed={toDefault} />
    </ButtonGroup>
  );
};
