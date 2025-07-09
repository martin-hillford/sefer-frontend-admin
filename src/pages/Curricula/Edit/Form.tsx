import { DropDown, Header, Line, TextArea, TextField } from 'sefer/components';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { DataContext } from 'sefer/types/DataContext';
import { useLevelLabels } from 'sefer/components/Level/useLevelLabels';
import { Actions } from './Actions';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Form = (props: { context : DataContext<CurriculumBase>, save: (c: CurriculumBase) => Promise<boolean> }) => {
  const { context, save } = props;
  const terms = useLocalization(localization);
  const header = context.data.id < 0 ? terms.new : context.data.name;
  const levels = useLevelLabels();

  return (
    <>
      <Header variant="large">{terms.curriculumName.replace('@name', header)}</Header>
      <TextField label={terms.name} dataContext={context} name="name" type="text" />
      <TextField label={terms.permalink} dataContext={context} name="permalink" type="text" />
      <TextArea dataContext={context} name="description" label={terms.description} />
      <DropDown label={terms.level} name="level" options={levels} dataContext={context} />
      <Line />
      <Actions context={context} save={save} />
    </>
  );
};
