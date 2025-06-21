import { ChevronRight, Plus, Remove } from 'sefer/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { Directory } from 'types/data/Directory';
import { Colors } from 'sefer/types/Colors';
import { AddFolderDialog } from './AddFolderDialog';
import { DeleteFolderDialog } from './DeleteFolderDialog';
import { Loading } from './Loading';
import { Panel } from './Panel';
import { Button, IconSize, Item, RefreshButton, ToolBar } from './Toolbar';
import { ViewMode } from './ViewMode';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useAddDirectory, useDeleteDirectory } from './hooks';

type Props = {
    directory? : Directory;
    viewMode : ViewMode;
    onDirectorySelected : (directory : Directory) => void;
    onParentSelected : () => void;
    onPathSelected : (path : string) => void;
    onViewFiles: () => void;
}

export const TreeView = (props : Props) => {
  const { directory, viewMode, onDirectorySelected, onParentSelected, onPathSelected } = props;
  const [state, setState] = useState('default');
  const terms = useLocalization(localization);
  const deleteDirectory = useDeleteDirectory();
  const addDirectory = useAddDirectory();

  const onDelete = () => setState('delete');
  const onAddFolder = () => setState('add');
  const onClose = () => setState('default');

  const onDeleteConfirmed = async () => {
    if(!directory) return;
    await deleteDirectory(directory);
    onParentSelected();
    setState('default');
  };

  const onFolderAdded = async (name : string) => {
    if (!directory) return;
    await addDirectory({ directory, name });
    onPathSelected(directory.path);
    setState('default');
  };

  const canAddFolder = directory && directory.path !== '/';
  const canMoveUp = directory && directory.path !== '/';
  const disabled = !directory || directory.path === '/'
        || directory.path === '/public' || directory.path === '/private'
        || directory.path === 'public/' || directory.path === 'private/';

  if (viewMode === ViewMode.File) return null;
  return (
    <Container $viewMode={viewMode}>
      <ToolBar>
        <Button disabled={disabled} onClick={onDelete}>
          <Remove size={IconSize} /><span>{terms.removeFolder}</span>
        </Button>
        <Button disabled={!canAddFolder} onClick={onAddFolder}>
          <Plus size={IconSize} />
        </Button>
        <RefreshButton {...props} />
        <ViewDirectoryButton {...props} />
        <DeleteFolderDialog onClose={onClose} onConfirmed={onDeleteConfirmed} show={state === 'delete'} />
        <AddFolderDialog onClose={onClose} onFolderAdded={onFolderAdded} show={state === 'add'} />
      </ToolBar>
      <Panel>
        {canMoveUp && <DirectoryItem onClick={onParentSelected}>...</DirectoryItem> }
        {directory?.directories?.map(d => <DirectoryItem key={d.path} onClick={() => { onDirectorySelected(d); }}>{d.name}</DirectoryItem>)}
        <Loading directory={directory} />
      </Panel>
    </Container>
  );
};

const Container = styled.div<{$viewMode : ViewMode}>`
    display: flex;
    height: 100%;
    flex: 0 0 ${p => (p.$viewMode === ViewMode.Both ? 25 : 100)}%;
    flex-direction: column;
`;

export const DirectoryItem = styled(Item)`
    color: #666666;
    cursor: pointer;

    &:hover {
        background-color: ${Colors.Blue};
        color:white;
        border-left:1px solid white;
    }
`;

const ViewDirectoryButton = (props : {viewMode : ViewMode, onViewFiles: () => void }) => {
  const { viewMode, onViewFiles } = props;
  if (viewMode !== ViewMode.Directory) return null;
  return (
    <Button onClick={onViewFiles}>
      <ChevronRight size={IconSize} />
    </Button>
  );
};
