import { ConfirmDialog, TextField } from 'sefer/components';
import { useState } from 'react';
import styled from 'styled-components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type Props = {
  onClose: () => void,
  show: boolean,
  onFolderAdded: (name: string) => void
}

export const AddFolderDialog = (props: Props) => {
  const terms = useLocalization(localization).addFolderDialog;
  const { onClose, onFolderAdded, show } = props;
  const [name, setName] = useState('');
  const [error, setError] = useState<string | undefined>();
  const validate = useValidate();

  const content = (
    <Content>
      <TextField name="name" label={terms.name} onChange={setName} value={name} error={error} />
    </Content>
  );

  const onConfirmed = () => {
    onFolderAdded(name);
    setName('');
  };

  const onCanceled = () => {
    setName('');
    onClose();
  };

  const onValidate = () => {
    const validated = validate(name);
    setError(validated);
    return validated === undefined;
  };

  return (
    <ConfirmDialog
      header={terms.addFolderHeader}
      buttonText={terms.add}
      content={content}
      onConfirmed={onConfirmed}
      onValidate={onValidate}
      onCanceled={onCanceled}
      variant="primary"
      show={show}
      speed={0}
      layer={20}
    />
  );
};

const Content = styled.div`
    width: 400px;
`;

const useValidate = () => {
  const terms = useLocalization(localization).addFolderDialog;
  return (name: string) => {
    if (!name || name.length === 0) return terms.nameEmpty;
    if (name.length < 3) return terms.nameTooShort;
    if (name.length > 255) return terms.nameTooLong;
    if (!/^[a-zA-Z0-9_\-.]*$/.test(name)) return terms.nameWrongCharacters;
    return undefined;
  };
}

