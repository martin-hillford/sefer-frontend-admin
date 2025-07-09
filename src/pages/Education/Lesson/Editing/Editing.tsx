import { Button, ButtonGroup, EditLayout, Header, Jumbotron } from 'sefer/components';
import { ContentBlockTypeLabel } from 'components';
import { useScrollContext } from 'context/ScrollContext';
import { ContentBlock } from 'types/data/ContentBlock';
import { ContentBlockType } from 'types/data/ContentBlockType';
import { BlockProps } from './BlockProps';
import { CommonSettings } from './CommonSettings';
import { fromTyped, toTyped } from './ContentBlockTyped';
import { MediaElement } from './MediaElement';
import { QuestionBoolean } from './QuestionBoolean';
import { QuestionMultipleChoice } from './QuestionMultipleChoice';
import { QuestionOpen } from './QuestionOpen';
import { TextElement } from './TextElement';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { useContentBlockDataContext } from '../useContentBlockDataContext';

type EditingProps = {
    onClose : () => Promise<void>;
    block : ContentBlock;
    onChange : (block : ContentBlock) => void;
}

export const Editing = (props : EditingProps) => {
  const { onClose, onChange, block } = props;
  const contentBlock = useContentBlockDataContext(toTyped(block));
  const scrollContext = useScrollContext();
  const terms = useLocalization(localization);


  const onAccept = async () => {
    const validate = await contentBlock.validate();
    if (!validate) return scrollContext?.toTop();
    const changed = fromTyped(contentBlock.data);
    onChange(changed);
    return onClose();
  };

  return (
    <EditLayout onAccept={onClose} onReject={onClose} title={terms.title} subTitle={terms.subTitle}>
      <Jumbotron>
        <Header variant="large">
          <ContentBlockTypeLabel type={contentBlock.data.type} />
          <span> {terms.edit}</span>
        </Header>
        <CommonSettings block={contentBlock} />
        <SpecificSettings block={contentBlock} />
        <ButtonGroup $pull="right">
          <Button onClick={() => { onClose().then() }}>{terms.cancel}</Button>
          <Button onClick={onAccept} variant="primary">{terms.ready}</Button>
        </ButtonGroup>
      </Jumbotron>
    </EditLayout>
  );
};

const SpecificSettings = (props : BlockProps) => {
  const { block } = props;
  switch (block.data.type) {
    case ContentBlockType.QuestionBoolean:
      return <QuestionBoolean block={block} />;
    case ContentBlockType.ElementText:
      return <TextElement block={block} />;
    case ContentBlockType.QuestionOpen:
      return <QuestionOpen block={block} />;
    case ContentBlockType.ElementVideo:
    case ContentBlockType.ElementYoutube:
    case ContentBlockType.ElementImage:
    case ContentBlockType.ElementVimeo:
      return <MediaElement block={block} />;
    case ContentBlockType.QuestionMultipleChoice:
      return <QuestionMultipleChoice block={block} />;
    default:
      return null;
  }
};
