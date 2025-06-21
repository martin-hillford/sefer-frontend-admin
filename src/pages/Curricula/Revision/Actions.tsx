import { BackNoSaveButton, ButtonGroup, SaveButton } from 'sefer/components';
import { useNavigate } from 'react-router-dom';
import { CurriculumWithRevisions as Curriculum } from 'types/data/curricula/Revision';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  curriculum : Curriculum,
  save : (years : number | null) => Promise<boolean>
  hasChanges : boolean
  onValidate: () => Promise<boolean>
  years: number | null
}

export const Actions = (props : Props) => {
  const { curriculum, save, hasChanges,onValidate,  years } = props;
  const terms = useLocalization(localization);
  const back = `/curricula/revisions/${curriculum.id}`;
  const navigate = useNavigate();

  const onSave = async () => save(years);
  const onClosed = () => navigate(back);

  return (
    <ButtonGroup $pull="right">
      <BackNoSaveButton
        onHasChanges={() => hasChanges}
        url={back}
      />
      <SaveButton
        onValidate={onValidate}
        saving={terms.saving}
        saved={terms.saved}
        onSave={onSave}
        onClosed={onClosed}
      />
    </ButtonGroup>
  )
};
