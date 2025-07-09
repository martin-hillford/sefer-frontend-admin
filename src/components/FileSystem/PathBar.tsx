import { Folder } from 'sefer/icons';
import styled from 'styled-components';
import { Colors } from 'sefer/types/Colors';
import { FilesViewProps } from './FilesView';
import { IconSize, Item } from './Toolbar';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const PathBar = (props : FilesViewProps) => {
  const { directory, onPathSelected } = props;
  const terms = useLocalization(localization);

  const children = [
    <Part key="/" onClick={() => { onPathSelected('/'); }}>{terms.root}</Part>,
  ];

  if (!directory) return null;

  const paths = directory.path.split('/');
  for (let index = 0; index < paths.length; index++) {
    if (paths[index].trim() === '') continue;

    if (children.length === 1) children.push(<Separator key="//">/</Separator>);

    const path = paths.slice(0, index + 1).join('/');
    const onClick = () => { onPathSelected(path); };
    children.push(<Part key={path} onClick={onClick}>{paths[index]}</Part>);
    if (index < paths.length - 1) children.push(<Separator key={`${path}/`}>/</Separator>);
  }

  return (
    <Path>
      <Folder size={IconSize} />
      {children}
    </Path>
  );
};

const Path = styled(Item)`
    color: ${Colors.Blue};
    flex: 0 0 54px;
`;

const Part = styled.span`
    color: ${Colors.Blue};
    padding: 0 4px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const Separator = styled.span`
    padding: 0 4px;
    color:#cccccc;
`;
