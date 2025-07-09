import { BackNoSaveButton, ButtonGroup, SaveButton } from 'sefer/components';
import { useNavigate } from 'react-router-dom';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Actions = (props: { context : DataContext<CurriculumBase>, save: (c: CurriculumBase) => Promise<boolean> }) => {
  const { context, save } = props;
  const terms = useLocalization(localization);
  const navigate = useNavigate();
  const onSave = async () => save(context.data);
  const onValidate = async () => context.validate();
  const onClosed = () => navigate('/curricula');

  return (
      <ButtonGroup $pull="right">
        <BackNoSaveButton context={context} url="/curricula" />
        <SaveButton
          onSave={onSave}
          onClosed={onClosed}
          onValidate={onValidate}
          saving={terms.saving}
          saved={terms.saved}
        />
      </ButtonGroup>
  );
};
