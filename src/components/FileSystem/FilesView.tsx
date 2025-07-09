import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Directory, File } from 'types/data/Directory';
import { FileView } from './FileView';
import { FilesContent } from './FilesContent';
import { FilesViewToolbar } from './FilesViewToolbar';
import { Loading } from './Loading';
import { PathBar } from './PathBar';
import { Uploader, UploaderHandles } from './Uploader';
import { ViewMode } from './ViewMode';

export type FilesViewProps = {
    directory? : Directory;
    viewMode : ViewMode;
    onViewDirectory: () => void;
    onFileSelected?: (file : File | undefined) => void;
    onPathSelected : (path : string) => void;
    multiSelect : boolean
}

export const FilesView = (props : FilesViewProps) => {
  const { viewMode, directory, onPathSelected, multiSelect, onFileSelected } = props;
  const [selected, setSelected] = useState<File[]>([]);
  const uploader = useRef<UploaderHandles>(null);

  useEffect(() => {
    setSelected([]);
  }, [directory]);

  if (viewMode === ViewMode.Directory) return null;

  const onSelected = (file : File) => {
    const files = !multiSelect ? single(file) : multi(file);
    setSelected(files);
    if (onFileSelected) onFileSelected(files.length !== 0 ? files[0] : undefined);
  };

  const multi = (file : File) => {
    if (selected.findIndex(f => f.url === file.url) === -1) return [...selected, file];
    return selected.filter(f => f.url !== file.url);
  };

  const single = (file : File) => {
    if (selected.findIndex(f => f.url === file.url) === -1) return [file];
    return [];
  };

  const onOutsideClick = () => { setSelected([]); };
  const onUpload = async () => { await uploader.current?.click(); };

  const onUploadCompleted = () => {
    if (directory) onPathSelected(directory?.path);
  };

  return (
    <Container $viewMode={viewMode}>
      <FilesViewToolbar {...props} onUpload={onUpload} selected={selected} />
      <PathBar {...props} />
      <FilesContent directory={directory} onClick={onOutsideClick} onUploadCompleted={onUploadCompleted}>
        <FileContainer>
          {directory?.files?.map(f => (
            <FileView
              key={f.url}
              selected={selected.findIndex(s => s.url === f.url) !== -1}
              {...props}
              file={f}
              onFileSelected={onSelected}
            />
          ))}
        </FileContainer>
        <Loading directory={directory} />
      </FilesContent>
      { directory && <Uploader ref={uploader} directory={directory} onUploadCompleted={onUploadCompleted} /> }
    </Container>
  );
};

const Container = styled.div<{$viewMode : ViewMode}>`
    display: flex;
    height: 100%;
    flex: 0 0 ${p => (p.$viewMode === ViewMode.Both ? 75 : 100)}%;
    box-sizing: border-box;
    border-left: ${p => (p.$viewMode === ViewMode.Both ? 1 : 0)}px solid #ddd!important;
    flex-direction: column;
`;

const FileContainer = styled.div`
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
`;
