import { Grid } from 'sefer/components';
import { ContentBlock } from 'types/data/ContentBlock';
import { BlockContent } from './BlockContent';
import { BoolAnswerProperty } from 'components';

export const BlockSettings = (props : { block : ContentBlock }) => {
  const { block } = props;
  return (
    <>
      <Grid>
        <BoolAnswerProperty block={block} />
      </Grid>
      <BlockContent block={block} />
    </>
  );
};
