import { TextEditor as TextArea } from '@martin-hillford/markdown-ts-react';
import { useState } from 'react';
import styled from 'styled-components';
import { Preview } from './Preview';
import { Toolbar } from './Toolbar';
import { useInlineParser } from 'hooks/useInlineParser';

type CursorPosition = { start: number; end: number; }

type TextEditorProps = {
    content : string,
    setContent : (s : string) => void
}

export const TextEditor = (props : TextEditorProps) => {
  const inline = useInlineParser();
  const { content, setContent } = props;

  const [position, setPosition] = useState<CursorPosition>({ start: 0, end: 0 });
  const [showPreview, setShowPreview] = useState(false);

  const onReplaceText = (replace : string) => {
    const { start } = position;
    const { end } = position;
    const updated = content.substring(0, start) + replace + content.substring(end, content.length);
    setContent(updated);
  };

  const onInsertText = (text : string) => {
    if (!content) return setContent(text);
    const updated = content.substring(0, position.start) + text + content.substring(position.start);
    return setContent(updated);
  };

  const selection = content?.substring(position.start, position.end);

  const value = content
    .replace('\r\n', '\n')
    .replace('\n\r', '\n');

  if(inline === undefined) return null;
  return (
    <Wrapper>
      <Panel $withPreview={showPreview}>
        <Heading>
          <Toolbar
            onInsertText={onInsertText}
            onReplaceText={onReplaceText}
            selection={selection}
            onPreview={() => { setShowPreview(p => !p); }}
            withPreview={showPreview}
          />
        </Heading>
        <TextArea
          onCursorMove={setPosition}
          value={value}
          onChange={setContent}
          inline={inline}
        />
      </Panel>
      <Preview withPreview={showPreview} content={content} />
    </Wrapper>
  );
};

const Heading = styled.div`
    padding:5px;
    background-color: #f5f5f5;
    height: 44px;
`;

const Panel = styled.div<{$withPreview : boolean}>`
    color: #212121;
    border: 1px solid #dddddd;
    padding: 0;
    margin: 0 0 15px;
    background-color: white;
    flex: 0 0 ${p => (p.$withPreview ? 50 : 100)}%;

    div, textarea {
        line-height: 28px;
    }
`;

const Wrapper = styled.div`
    display: flex;
`;
