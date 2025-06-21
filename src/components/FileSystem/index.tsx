import { useState } from 'react';
import { Directory, File } from 'types/data/Directory';
import { DirectoryView } from './DirectoryView';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useFetchDirectory } from './hooks';

const useRoot = () => {
  const terms = useLocalization(localization);
  return {
    files: [] as File[],
    path: '/',
    name: 'root',
    directories: [
      { path: '/public', name: terms.public },
      { path: '/private', name: terms.private },
    ],
  } as Directory;
}

export const FileSystem = (props : { multiSelect? : boolean, onFileSelected?: (file : File | undefined) => void}) => {
  const root = useRoot();
  const { onFileSelected, multiSelect } = props;
  const [directory, setDirectory] = useState<Directory | undefined>(root);
  const fetchDirectory = useFetchDirectory();

  const onPathSelected = async (path : string) => {
    if (!path || path === root.path || path === '') return setDirectory(root);
    setDirectory(undefined);
    const fetched = await fetchDirectory(path);
    return setDirectory(fetched);
  };

  return (
    <DirectoryView
      directory={directory}
      onFileSelected={onFileSelected}
      onPathSelected={onPathSelected}
      multiSelect={multiSelect ?? false}
    />
  );
};
