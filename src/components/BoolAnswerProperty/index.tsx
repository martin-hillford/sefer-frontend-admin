import { Boolean, GridColumn, Property } from 'sefer/components';
import { ContentBlock } from 'types/data/ContentBlock';
import { ContentBlockType } from 'types/data/ContentBlockType';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const BoolAnswerProperty = (props : { block : ContentBlock }) => {
  const { block } = props;
  const terms = useLocalization(localization);
  if (block.type !== ContentBlockType.QuestionBoolean) return null;
  return (
    <>
      <GridColumn $size={50}>
        <Property label={terms.answer}>
          <Boolean value={block.answer === 'Correct'} colored={false} size={14} />
        </Property>
      </GridColumn>
      <GridColumn $size={50} />
    </>
  );
};
