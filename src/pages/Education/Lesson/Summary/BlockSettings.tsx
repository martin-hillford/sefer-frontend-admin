import { Boolean, Button, ButtonGroup, Grid, GridColumn, Property } from 'sefer/components';
import { Edit, Remove } from 'sefer/icons';
import { ContentBlock } from 'types/data/ContentBlock';
import { BlockContent } from './BlockContent';
import { BoolAnswerProperty } from 'components';
import { MultiCorrectProperty } from './MultiCorrectProperty';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import styles from '../lesson.module.css';

type BlockSettingsProps = {
    block: ContentBlock
    onEdit: (block: ContentBlock) => void
    onDelete: (block: ContentBlock) => void
}

export const BlockSettings = (props: BlockSettingsProps) => {
  const { block, onEdit, onDelete } = props;
  const terms = useLocalization(localization);
  return (
    <>
      <Grid>
        <GridColumn $size={50}><Property flex={40} label={terms.number}>{block.number}</Property></GridColumn>
        <GridColumn $size={50}><Property label={terms.heading}>{block.heading}</Property></GridColumn>
        <GridColumn $size={50}>
          <Property flex={40} label={terms.forcePageBreak}>
            <Boolean value={block.forcePageBreak} colored={false} size={14} />
          </Property>
        </GridColumn>
        <MultiCorrectProperty block={block} />
        <BoolAnswerProperty block={block} />
      </Grid>
      <BlockContent block={block} />
      <ButtonGroup className={styles.blockSettingsButtons} $pull="right">
        <Button onClick={() => { onEdit(block); }}><Edit size={20} /></Button>
        <Button onClick={() => { onDelete(block); }} variant="danger"><Remove size={20} /></Button>
      </ButtonGroup>
    </>
  );
};
