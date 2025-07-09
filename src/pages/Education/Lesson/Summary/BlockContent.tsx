import { Video, Vimeo, YouTube } from '@martin-hillford/markdown-ts-react';
import { ContentBlock } from 'types/data/ContentBlock';
import { ContentBlockType } from 'types/data/ContentBlockType';
import { ElementImage } from './ElementImage';
import { MediaTitle } from './MediaTitle';
import { Question } from './Question';
import { QuestionMultipleChoice } from './QuestionMultipleChoice';
import { TextElement } from './TextElement';

export const BlockContent = (props : { block : ContentBlock }) => {
  const { block } = props;
  switch (block.type) {
    case ContentBlockType.ElementText:
      return <TextElement block={block} />;
    case ContentBlockType.QuestionBoolean:
    case ContentBlockType.QuestionOpen:
      return <Question block={block} />;
    case ContentBlockType.QuestionMultipleChoice:
      return <QuestionMultipleChoice block={block} />;
    case ContentBlockType.ElementImage:
      return <ElementImage block={block} />;
    case ContentBlockType.ElementVideo:
      return (
        <>
          <Video url={block.url} />
          <MediaTitle block={block} />
        </>
      );
    case ContentBlockType.ElementYoutube:
      return (
        <>
          <YouTube url={block.url} />
          <MediaTitle block={block} />
        </>
      );
    case ContentBlockType.ElementVimeo:

      return (
        <>
          <Vimeo url={block.url} />
          <MediaTitle block={block} />
        </>
      );
    default:
      return null;
  }
};
