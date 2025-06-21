import { BackNoSaveButton, Button, ButtonGroup, SaveButton } from 'sefer/components';
import { useNavigate } from 'react-router-dom';
import { CurriculumWithRevisions } from 'types/data/curricula/Revision';
import { BlockProps } from './BlockProps';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';

interface Props extends BlockProps {
  show: boolean;
  setShowCourses: (show: boolean) => void
  setShowError: (show: boolean) => void
}

export const Actions = (props: Props) => {
  const { block, curriculum, year, save, setShowCourses, setShowError } = props;
  const terms = useLocalization(localization);
  const navigate = useNavigate();

  const onValidate = async () => {
    const valid = await block.validate();
    if (valid && block.data.courses && block.data.courses.length >= 1) return true;
    setShowError(true);
    return false;
  };

  return (
    <ButtonGroup $pull="right">
      <BackNoSaveButton
        context={block}
        url={getReturnUrl(curriculum, year)}
      />
      <Button
        variant="default"
        label={terms.courses}
        onClick={() => setShowCourses(true)}
      />
      <SaveButton
        onValidate={onValidate}
        saving={terms.saving}
        saved={terms.saved}
        onSave={save}
        onClosed={() => navigate(getReturnUrl(curriculum, year))}
      />
    </ButtonGroup>
  );
};

const getReturnUrl = (curriculum: CurriculumWithRevisions, year?: number) => {
  if (!year) return `/curricula/revisions/${curriculum.id}`;
  return `/curricula/revisions/${curriculum.id}/years/${year}`;
};
