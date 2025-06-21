import { StyledContent } from 'components';
import { ContentBlock } from 'types/data/ContentBlock';

export const Content = (props : { block : ContentBlock}) => {
  const { block } = props;

  const useMarkDown = block.isMarkDownContent;
  const content = block.content ? block.content : '';

  return (
    <>
      {useMarkDown && <StyledContent content={block.content} />}
      {!useMarkDown && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </>
  );
};
