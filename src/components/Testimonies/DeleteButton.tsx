import { Trash } from 'sefer/icons';
import { ConfirmDialog, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { Testimony } from 'types/data/resources/Testimony';
import { Button } from './Button';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useDeleteTestimony } from './useDeleteTestimony';

export const DeleteButton = (props : { testimony : Testimony, deleted : () => void }) => {
  const { testimony, deleted } = props;
  const [state, setState] = useState('default');
  const confirm = () => setState('confirming');
  const terms = useLocalization(localization);
  const deleteTestimony = useDeleteTestimony();

  const remove = async () => {
    setState('deleting');
    await deleteTestimony(testimony.id);
    setState('completed');
  };

  return (
    <>
      <Button onClick={confirm}><Trash size={18} /></Button>
      <Delete show={state === 'confirming'} onCanceled={() => setState('default')} onConfirmed={remove} />
      <SavingAlert show={state === 'deleting'} content={terms.deleting} />
      <SavedAlert show={state === 'completed'} onClosed={deleted} content={terms.deleted} />
    </>
  );
};

const Delete = (props : { show: boolean, onConfirmed : () => void, onCanceled : () => void }) => {
  const { onConfirmed, onCanceled, show } = props;
  const terms = useLocalization(localization);
  if(!show) return null;
  return (
    <ConfirmDialog
      {...terms.deleteDialog}
      onConfirmed={onConfirmed}
      onCanceled={onCanceled}
      variant="danger"
    />
  );
};
