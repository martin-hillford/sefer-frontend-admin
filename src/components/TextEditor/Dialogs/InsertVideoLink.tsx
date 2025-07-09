import { ConfirmDialog, TextField } from 'sefer/components';
import { useState } from 'react';
import styled from 'styled-components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type HyperlinkProps = {
    onInsert: (value : string) => void;
    selection: string | undefined;
    onClose: () => void;
    type : string;
    onValidate : (value : string) => string | undefined;
}

export const InsertVideoLink = (props : HyperlinkProps) => {
  const { onInsert, selection, onClose, onValidate, type } = props;
  const terms = useLocalization(localization);
  const [valid, isValid] = useState<boolean | undefined>(undefined);
  const [link, setLink] = useState('');

  const onInsertLink = () => {
    const title = selection || type;
    const result = onValidate(link);
    isValid(true);
    if (result) onInsert(`[${title}](${result} video)`);
  };

  const error = valid === false ? terms.validUrl : undefined;

  const content = (
    <Wrapper>
      <TextField error={error} label={terms.url} value={link} onChange={setLink} name="link" />
    </Wrapper>
  );
  return (
    <ConfirmDialog
      header={terms.insertVideo.replace('@type',type)}
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
