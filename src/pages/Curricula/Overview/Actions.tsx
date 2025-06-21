import { Button, ButtonGroup, DeleteButton } from 'sefer/components';
import { Edit } from 'sefer/icons';
import { Stage } from 'types/data/Stages';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { Props } from './Entities';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Actions = (props: Props & { curriculum?: CurriculumBase }) => {
  const { curriculum, reload, onDelete } = props;
  const terms = useLocalization(localization);

  if (!curriculum) return null;

  const isEditable = curriculum.stage === Stage.Edit || curriculum.stage === Stage.Test;
  const onClosed = () => reload();

  return (
    <ButtonGroup $pull="right">
      <Button link={`/curricula/revisions/${curriculum.id}`}>{terms.revisions}</Button>
      <Button
        disabled={!isEditable}
        link={`/curricula/edit/${curriculum.id}`}
        icon={<Edit size={16} />}
        label={terms.edit}
      />
      <DeleteButton
        confirm={terms.deleteCurriculumConfirm}
        disabled={!isEditable}
        header={terms.deleteCurriculumHeader}
        deleting={terms.deletingCurriculum}
        deleted={terms.curriculumDeleted}
        onDelete={() => onDelete(curriculum)}
        onClosed={onClosed}
      />
    </ButtonGroup>
  );
};
