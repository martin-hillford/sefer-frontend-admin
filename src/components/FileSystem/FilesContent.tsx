import { DragEvent, ReactNode, useState } from 'react';
import { Directory } from 'types/data/Directory';
import { Colors } from 'sefer/types/Colors';
import { isEmpty } from 'util/validation';
import { Panel } from './Panel';
import { Progress } from './Progress';
import { useUploadFile } from './useUploadFile';

interface Props {
    onUploadCompleted : () => void,
    directory : Directory | undefined,
    children : ReactNode,
    onClick : () => void
}

export const FilesContent = (props : Props) => {
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const { children, onClick, directory, onUploadCompleted } = props;
  const canUpload = directory && directory.path !== '/' && !isEmpty(directory.path);
  const uploadFile = useUploadFile();

  const onDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    (event.target as HTMLDivElement).style.backgroundColor = 'initial';
    if (!canUpload) return;

    // Use the DataTransferItemList interface to access the file(s)
    const items = event.dataTransfer.items;
    const files = [...items]
      .filter(item => item.kind === 'file')
      .map(item => item.getAsFile() as File);

    setProgress(0);

    const onProgress = (value : number) => { setProgress(value); };
    const payload = { path: directory.path, files, onProgress };

    await uploadFile(payload);

    setProgress(undefined);

    onUploadCompleted();
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!canUpload) return;
    (event.target as HTMLDivElement).style.backgroundColor = `${Colors.Blue}10`;
  };

  return (
    <>
      <Panel onClick={onClick} onDrop={onDrop} onDragOver={onDragOver}>
        {children}
      </Panel>
      <Progress progress={progress} />
    </>
  );
};
