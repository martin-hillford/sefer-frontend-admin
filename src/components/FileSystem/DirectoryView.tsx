import { useIsMobile } from './useIsMobile';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Directory, File } from 'types/data/Directory';
import { FilesView } from './FilesView';
import { TreeView } from './TreeView';
import { ViewMode } from './ViewMode';

type Props = {
    directory? : Directory;
    onFileSelected?: (file : File | undefined) => void;
    onPathSelected : (path : string) => void
    multiSelect : boolean
}

export const DirectoryView = (props : Props) => {
  const { directory, onFileSelected, onPathSelected, multiSelect } = props;
  const [viewMode, setViewMode] = useState<ViewMode | null>(ViewMode.Both);
  const isMobile = useIsMobile(992);

  useEffect(() => {
    if (isMobile) setViewMode(ViewMode.File);
    else setViewMode(ViewMode.Both);
  }, [isMobile]);

  if (viewMode === null) return null;

  const onDirectorySelected = (value : Directory) => {
    onPathSelected(value.path);
  };

  const onParentSelected = () => {
    if (!directory) return;
    const path = directory.path.endsWith('/') ? directory.path.substring(0, directory.path.length - 1) : directory.path;
    const length = path.lastIndexOf('/');
    const parentPath = path.substring(0, length);
    onPathSelected(parentPath);
  };

  return (
    <Container>
      <TreeView
        directory={directory}
        onDirectorySelected={onDirectorySelected}
        viewMode={viewMode}
        onParentSelected={onParentSelected}
        onPathSelected={onPathSelected}
        onViewFiles={() => setViewMode(ViewMode.File)}
      />
      <FilesView
        directory={directory}
        onViewDirectory={() => setViewMode(ViewMode.Directory)}
        viewMode={viewMode}
        onFileSelected={onFileSelected}
        onPathSelected={onPathSelected}
        multiSelect={multiSelect}
      />
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #f9f9f9;
    user-select: none;
`;
