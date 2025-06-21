import { ContentBlockType } from 'types/data/ContentBlockType';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const ContentBlockTypeLabel = (props : { type: ContentBlockType}) => {
  const terms = useLocalization(localization);
  switch (props.type) {
    case ContentBlockType.ElementAudio: return <>{terms.elementAudio}</>;
    case ContentBlockType.ElementVideo: return <>{terms.elementVideo}</>;
    case ContentBlockType.ElementYoutube: return <>{terms.elementYoutube}</>;
    case ContentBlockType.ElementVimeo: return <>{terms.elementVimeo}</>;
    case ContentBlockType.ElementImage: return <>{terms.elementImage}</>;
    case ContentBlockType.ElementLink: return <>{terms.elementLink}</>;
    case ContentBlockType.QuestionOpen: return <>{terms.questionOpen}</>;
    case ContentBlockType.QuestionBoolean: return <>{terms.questionBoolean}</>;
    case ContentBlockType.QuestionMultipleChoice: return <>{terms.questionMultipleChoice}</>;
    default: return <>{terms.elementText}</>;
  }
}
