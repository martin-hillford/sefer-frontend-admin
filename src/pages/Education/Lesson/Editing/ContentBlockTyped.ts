import { ContentBlock } from 'types/data/ContentBlock';
import { ContentBlockType } from 'types/data/ContentBlockType';
import { htmlToText } from 'util/html';

export type ContentBlockTyped = ContentBlock & {
    boolAnswer? : boolean
    content? : string
}

export const toTyped = (block : ContentBlock) => {
  const converted = { ...block } as ContentBlockTyped;
  converted.boolAnswer = block.answer === 'Correct';

  if (!block.isMarkDownContent) converted.content = htmlToText(block.content);
  return converted;
};

export const fromTyped = (block : ContentBlockTyped) => {
  const converted = { ...block } as ContentBlock;

  switch (block.type) {
    case ContentBlockType.QuestionBoolean:
      converted.answer = block.boolAnswer ? 'Correct' : 'Wrong';
      break;
    default:
      break;
  }

  // If the content itself has been updated, set the text to an empty string.
  // This will indicate this block is moved to mark down
  converted.isMarkDownContent = true;
  return converted;
};
