import { ConfirmDialog, Switch, TextField } from 'sefer/components';
import { useState } from 'react';
import styled from 'styled-components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type HyperlinkProps = {
    onInsert: (value : string) => void;
    selection: string | undefined;
    onClose: () => void;
}

export const InsertHyperlink = (props : HyperlinkProps) => {
  const { onInsert, selection, onClose } = props;
  const terms = useLocalization(localization);
  const [title, setTitle] = useState(selection);
  const [blank, setBlank] = useState(false);
  const [link, setLink] = useState('');

  const onInsertLink = () => {
    onInsert(`[${title}](${link}${blank ? 'blank' : ' '})`);
  };

  const content = (
    <Wrapper>
      <TextField label={terms.title} value={title} onChange={setTitle} name="Title" />
      <TextField label={terms.url} value={link} onChange={setLink} name="link" />
      <Switch label={terms.external} value={blank} onChange={setBlank} name="Blank" />
    </Wrapper>
  );
  return (
    <ConfirmDialog
      header={terms.insertLink}
      content={content}
      buttonText={terms.insert}
      onConfirmed={onInsertLink}
      onCanceled={onClose}
      variant="primary"
      speed={0}
    />
  );
};

const Wrapper = styled.div`
    min-width: 520px;
`;
