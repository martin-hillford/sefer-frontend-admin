import { Button, ButtonGroup, ConfirmButton, DeleteButton, SavedAlert } from 'sefer/components';
import { Edit, Remove } from 'sefer/icons';
import { useState } from 'react';
import { Series } from 'types/data/series/Series';
import { Props } from './Entities';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Actions = (props: Props & { selected: Series | undefined }) => {
  const { selected, refresh, onChange, onDelete } = props;
  const [ showFailed, setShowFailed] = useState<boolean>(false);
  const terms = useLocalization(localization);

  if (!selected) return null;

  const onClosed = () => refresh();
  const changeTerms = selected.isPublic ? terms.isPublic : terms.isClosed;

  const onSave = async () => {
    const result = await onChange(selected.id, !selected.isPublic);
    if (selected.isPublic || result) return result;
    setShowFailed(true);
    return false;
  };

  return (
    <>
      <PublishFailed
        content={terms.publishFailedMessage}
        show={showFailed}
        onClosed={() => setShowFailed(false)}
      />
      <ButtonGroup $pull="right">
        <ConfirmButton
          {...changeTerms}
          variant="default"
          onConfirmed={onSave}
          onClosed={onClosed}
        />
        <Button link={`/series/${selected.id}/courses`}>{terms.coursesButton}</Button>
        <Button
          link={`/series/${selected.id}`}
          icon={<Edit size={16} />}
          label={terms.editButton}
        />
        <DeleteButton
          confirm={terms.deleteConfirmation}
          header={terms.deleteHeader}
          deleting={terms.deletingMessage}
          deleted={terms.deletedMessage}
          onDelete={() => onDelete(selected)}
          onClosed={onClosed}
          icon={<Remove size={16} />}
          label={terms.deleteButtonLabel}
        />
      </ButtonGroup>
    </>
  );
};

const PublishFailed = (props: { show: boolean, content: string, onClosed: () => void }) => (
  <SavedAlert
    show={props.show}
    content={props.content}
    variant="danger"
    onClosed={props.onClosed}
  />
);
