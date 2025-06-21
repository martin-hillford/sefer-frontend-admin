import { ContentBlock } from 'types/data/ContentBlock';
import { ContentBlockType } from 'types/data/ContentBlockType';
import { Question } from './Question';
import { QuestionMultipleChoice } from './QuestionMultipleChoice';

export const BlockContent = (props : { block : ContentBlock }) => {
  const { block } = props;
  switch (block.type) {
    case ContentBlockType.QuestionBoolean:
    case ContentBlockType.QuestionOpen:
      return <Question block={block} />;
    case ContentBlockType.QuestionMultipleChoice:
      return <QuestionMultipleChoice block={block} />;
    default:
      return null;
  }
};
