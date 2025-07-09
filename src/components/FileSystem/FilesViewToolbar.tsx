import { Download, Remove, Upload, ZoomIn } from 'sefer/icons';
import { useState } from 'react';
import { File } from 'types/data/Directory';
import { isEmpty } from 'util/validation';
import { FileType, getFileType } from './FileType';
import { FilesViewProps } from './FilesView';
import { Button, IconSize, RefreshButton, ToolBar } from './Toolbar';
import { ViewMode } from './ViewMode';
import { LightBoxSlide } from 'sefer/components/LightBox/LightBoxSlide';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { DeleteFilesDialog } from './DeleteFilesDialoag';
import { BackButton } from './BackButton';
import { useDeleteFile } from './hooks';

type Props = FilesViewProps & {
    onUpload : () => void;
    selected : File[];
}

export const FilesViewToolbar = (props : Props) => {
  const { viewMode, directory, onUpload, selected, onPathSelected } = props;
  const [state, setState] = useState('default');
  const terms = useLocalization(localization);
  const deleteFile = useDeleteFile();

  const onDownload = () => { download(selected); };

  const viewable = areViewable(selected);
  const canUpload = directory && directory.path !== '/' && !isEmpty(directory.path);

  const onView = () => {
    if (viewable) setState('view');
  };

  const onDelete = () => setState('delete');
  const onClose = () => setState('default');

  const onDeleteConfirmed = async () => {
    if (selected.length === 0) return;
    await deleteFile(selected);
    if (directory) onPathSelected(directory.path);
    setState('default');
  };

  if (viewMode === ViewMode.Directory) return null;
  return (
    <>
      <ToolBar>
        <BackButton {...props} />
        <Button disabled={selected.length === 0} onClick={onDownload}>
          <Download size={IconSize} />
          <span>{terms.download}</span>
        </Button>
        <Button disabled={!viewable} onClick={onView}>
          <ZoomIn size={IconSize} />
          <span>{terms.view}</span>
        </Button>
        <Button disabled={!canUpload} onClick={onUpload}>
          <Upload size={IconSize} />
          <span>{terms.upload}</span>
        </Button>
        <Button disabled={selected.length === 0} onClick={onDelete}>
          <Remove size={IconSize} />
          <span>{terms.removeFile}</span>
        </Button>
        <RefreshButton {...props} />
      </ToolBar>
      { state === 'view' && <LightBoxSlide layer={20} src={selected.map(s => s.url)} onClose={onClose} /> }
      <DeleteFilesDialog show={state === 'delete'} onClose={onClose} onConfirmed={onDeleteConfirmed} />
    </>
  );
};

const areViewable = (files : File[]) => {
  if (files.length !== 1) return false;
  const viewable = files.filter(file => {
    const type = getFileType(file);
    return type === FileType.Image;
  });

  return viewable.length === files.length;
};

const download = (files : File[]) => {
  files.forEach(file => {
    const link = document.createElement('a');
    link.download = file.name;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.href = file.url;
    link.click();
    link.remove();
  });
};

