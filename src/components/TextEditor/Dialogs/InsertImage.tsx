import { ConfirmDialog, DropDown, Property, TextField } from 'sefer/components';
import { useState } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'util/validation';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type ImageProps = {
    onInsert: (value : string) => void;
    selection: string | undefined;
    onClose: () => void;
}

export const InsertImage = (props : ImageProps) => {
  const { onInsert, selection, onClose } = props;
  const options = useOptions();
  const [title, setTitle] = useState(selection);
  const [link, setLink] = useState('');
  const [alignment, setAlignment] = useState<string>('none');
  const terms = useLocalization(localization);

  const onInsertImage = () => {
    const alt = isEmpty(title) ? '_' : title;
    onInsert(`![${alt}](${link})`);
  };

  const content = (
    <Wrapper>
      <TextField label={terms.title} value={title} onChange={setTitle} name="title" />
      <TextField label={terms.url} value={link} onChange={setLink} name="link" />
      <Property label={terms.alignment}>
        <DropDown options={options} value={alignment} name="alignment" onChange={setAlignment} />
      </Property>
    </Wrapper>
  );

  return (
    <ConfirmDialog
      header={terms.insertImage}
      content={content}
      buttonText={terms.insert}
      onConfirmed={onInsertImage}
      onCanceled={onClose}
      variant="primary"
      speed={0}
    />
  );
};

const useOptions = () => {
  const terms = useLocalization(localization);
  return [
    { label: terms.none, value: 'none' },
    { label: terms.left, value: 'left' },
    { label: terms.right, value: 'right' },
  ];
}

const Wrapper = styled.div`
    min-width: 520px;
`;
