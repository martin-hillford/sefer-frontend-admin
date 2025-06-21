import { Container, DropDown, Header, Line, TextArea, TextField } from 'sefer/components';
import { Series } from 'types/data/series/Series';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { Actions } from './Actions';
import { useLevelLabels } from 'sefer/components/Level/useLevelLabels';

export const Form = (props: { context : DataContext<Series>, save: () => Promise<boolean> }) => {
  const { context, save } = props;
  const terms = useLocalization(localization);
  const header = terms.seriesName.replace("@name", context.data.id < 0 ? terms.new : context.data.name);
  const levels = useLevelLabels();

  return (
    <Container>
      <Header variant="large">{header}</Header>
      <TextField label={terms.nameLabel} dataContext={context} name="name" type="text" />
      <TextArea dataContext={context} name="description" label={terms.descriptionLabel} />
      <DropDown label={terms.levelLabel} name="level" options={levels} dataContext={context} />
      <Line />
      <Actions context={context} save={save} />
    </Container>
  );
};
