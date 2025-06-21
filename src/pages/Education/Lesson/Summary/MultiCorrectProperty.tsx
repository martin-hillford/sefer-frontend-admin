import { Boolean, GridColumn, Property } from 'sefer/components';
import { ContentBlock } from 'types/data/ContentBlock';
import { ContentBlockType } from 'types/data/ContentBlockType';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const MultiCorrectProperty = (props : { block : ContentBlock }) => {
  const { block } = props;
  const terms = useLocalization(localization);

  if (block.type !== ContentBlockType.QuestionMultipleChoice) return null;
  return (
    <>
      <GridColumn $size={50}>
        <Property label={terms.multiCorrect}>
          <Boolean value={block.isMultiSelect} colored={false} size={14} />
        </Property>
      </GridColumn>
      <GridColumn $size={50} />
    </>
  );
};
