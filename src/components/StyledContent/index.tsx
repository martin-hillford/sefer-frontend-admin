import { BaseStyle } from 'sefer/components';
import { MarkDown } from '@martin-hillford/markdown-ts-react';

export const StyledContent = (props : { content? : string}) => {
  const { content = '' } = props;
  return (
    <BaseStyle>
      <MarkDown markdown={content} />
    </BaseStyle>
  );
};
