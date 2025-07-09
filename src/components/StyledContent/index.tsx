import { BaseStyle } from 'sefer/components';
import { MarkDown } from '@martin-hillford/markdown-ts-react';
import { useInlineParser } from 'hooks/useInlineParser';

export const StyledContent = (props : { content? : string}) => {
  const { content = '' } = props;
  const parsers = useInlineParser();

  if(parsers === undefined) return null;
  const getInlineParsers = () => parsers.map(p => p.parser);
  
  return (
    <BaseStyle>
      <MarkDown options={{ getInlineParsers  }} markdown={content} />
    </BaseStyle>
  );
};
