import { Button, ButtonGroup, Dialog, TextField } from 'sefer/components';
import { FileSystem } from 'components/FileSystem';
import { File } from 'types/data/Directory';
import { File as FileIcon } from 'sefer/icons';
import { useState } from 'react';
import { TextFieldProps } from 'sefer/components/TextField';
import styles from './urlselector.module.css';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';

export const UrlSelector = (props : TextFieldProps) => {
  const [ showFileSelector, setShowFileSelector ] = useState(false);
  const{ onChange, dataContext, name } = props;

  const onUrlChanged = (value : string) => {
    if(dataContext) dataContext.setValue(name, value);
    if(onChange) onChange(value);
    setShowFileSelector(false);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <TextField {...props} />
        <div>
          <Button onClick={() => setShowFileSelector(true)} variant="default" icon={<FileIcon size={20} />} />
        </div>
      </div>
      <FileSelector onClose={() => setShowFileSelector(false)} show={showFileSelector} onUrlChanged={onUrlChanged} />
    </>
  );
}


const FileSelector = (props : { show: boolean, onUrlChanged : (value : string) => void, onClose: () => void }) => {
  const [file, setFile] = useState<File | undefined>();
  const { show, onUrlChanged, onClose } = props;
  const terms = useLocalization(localization);

  const onInsertFile = () => {
    if (!file) return;
    onUrlChanged(file.url);
    onClose();
  };

  if(!show) return null;
  return (
    <Dialog>
      <div className={styles.content}>
        <FileSystem multiSelect={false} onFileSelected={setFile} />
      </div>
      <div className={styles.footer}>
        <ButtonGroup $pull="right">
          <Button onClick={() => { onClose(); }}>{terms.cancel}</Button>
          <Button
            onClick={onInsertFile}
            disabled={!file}
            variant="primary"
            label={terms.insertFile}
          />
        </ButtonGroup>
      </div>
    </Dialog>
  );
};
