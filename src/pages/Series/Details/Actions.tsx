import { BackNoSaveButton, ButtonGroup, SaveButton } from 'sefer/components';
import { useNavigate } from 'react-router-dom';
import { Series } from 'types/data/series/Series';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Actions = (props: { context : DataContext<Series>, save: () => Promise<boolean> }) => {
  const { context, save } = props;
  const terms = useLocalization(localization);
  const navigate = useNavigate();
  const onValidate = async () => context.validate();
  const onClosed = () => navigate('/series');

  return (
      <ButtonGroup $pull="right">
        <BackNoSaveButton context={context} url="/series" />
        <SaveButton
          onSave={save}
          onClosed={onClosed}
          onValidate={onValidate}
          saving={terms.savingMessage}
          saved={terms.savedMessage}
        />
      </ButtonGroup>
  );
};
