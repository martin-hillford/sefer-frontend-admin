import { FilesViewProps } from './FilesView';
import { ViewMode } from './ViewMode';
import { Button, IconSize } from './Toolbar';
import { ChevronLeft } from 'sefer/icons';

export const BackButton = (props : FilesViewProps) => {
  const { viewMode, onViewDirectory } = props;
  if (viewMode !== ViewMode.File) return null;
  return (
    <Button onClick={onViewDirectory}>
      <ChevronLeft size={IconSize} />
    </Button>
  );
};
