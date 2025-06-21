import { Switch, TextField } from 'sefer/components';
import { ContentBlock } from 'types/data/ContentBlock';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const CommonSettings = (props : { block : DataContext<ContentBlock> }) => {
  const terms = useLocalization(localization);
  const { block } = props;
  return (
    <>
      <TextField label={terms.heading} name="heading" dataContext={block} />
      <TextField label={terms.number} name="number" dataContext={block} />
      <Switch label={terms.forcePageBreak} name="forcePageBreak" dataContext={block} />
    </>
  );
};
