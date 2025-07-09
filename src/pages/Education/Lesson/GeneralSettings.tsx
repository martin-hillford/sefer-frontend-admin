import { ContentState, Header, TextField } from 'sefer/components';
import { Lesson } from 'types/data/Lesson';
import { Colors } from 'sefer/types/Colors';
import { DataContext } from 'sefer/types/DataContext';
import { AudioReference } from './AudioReference';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const GeneralSettings = (props : { context : DataContext<Lesson> }) => {
  const terms = useLocalization(localization);
  const { context } = props;

  return (
    <>
      <Header inline color={Colors.Blue} variant="medium">{terms.settings}</Header>
      <TextField maxWidth={false} label={terms.name} name="name" dataContext={context} />
      <TextField maxWidth={false} label={terms.number} name="number" dataContext={context} />
      <TextField maxWidth={false} label={terms.description} type="textarea" name="description" dataContext={context} />
      <TextField maxWidth={false} label={terms.readBeforeStart} type="textarea" name="readBeforeStart" dataContext={context} />
      <ContentState maxWidth={false} lesson={context.data} />
      <AudioReference context={context} />
    </>
  );
};
