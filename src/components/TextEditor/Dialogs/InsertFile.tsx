import { Button, ButtonGroup, Dialog } from 'sefer/components';
import styled from 'styled-components';
import { File } from 'types/data/Directory';
import { useState } from 'react';

import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { FileType, getFileType } from '../../FileSystem/FileType';
import { FileSystem } from '../../FileSystem';

export const InsertFile = (props : { onInsert : (value : string) => void, onClose : () => void }) => {
  const [file, setFile] = useState<File | undefined>();
  const { onClose, onInsert } = props;
  const terms = useLocalization(localization);

  const onInsertFile = () => {
    if (!file) return;
    onInsert(getMarkDown(file));
    onClose();
  };

  return (
    <Dialog>
      <Content>
        <FileSystem multiSelect={false} onFileSelected={setFile} />
      </Content>
      <Footer>
        <ButtonGroup $pull="right">
          <Button onClick={() => { onClose(); }}>{terms.cancel}</Button>
          <Button
            onClick={onInsertFile}
            disabled={!file}
            variant="primary"
            label={terms.insertFile}
          />
        </ButtonGroup>
      </Footer>
    </Dialog>
  );
};

const getMarkDown = (file : File) => {
  const type = getFileType(file);
  switch (type) {
    case FileType.Image: return `![${file.name}](${file.url})`;
    case FileType.Video: return `[${file.name}](${file.url} video)`;
    default: return `[${file.name}](${file.url} blank)`;
  }
};

const Content = styled.div`
    width: calc(100vw - 40px);
      height: calc(100vh - 120px);
`;

const Footer = styled.div`
    padding: 20px;
`;
