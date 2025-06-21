import { File as Doc, Film, Image, Pdf } from 'sefer/icons';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { File } from 'types/data/Directory';
import { Colors } from 'sefer/types/Colors';
import { FileType, getFileType } from './FileType';

type FileViewProps = {
    file : File,
    selected : boolean
    onFileSelected: (file : File) => void;
};

export const FileView = (props : FileViewProps) => {
  const { file, selected, onFileSelected } = props;

  const onClick : MouseEventHandler<HTMLDivElement> = (event) => {
    if (onFileSelected) onFileSelected(file);
    event.stopPropagation();
  };

  return (
    <FileBox onClick={onClick} $selected={selected}>
      <FileTypeIcon file={file} />
      <div>{file.name}</div>
    </FileBox>

  );
};

const FileBox = styled.div<{$selected : boolean}>`
    display: flex;
    margin : 15px;
    flex-direction: column;
    align-items: center;
    height:100px;
    width:100px;
    flex: 0 0 100px;
    color: ${p => (p.$selected ? Colors.Blue : '#666666')};
    cursor: pointer;

    svg {
        flex : 0 0 60px
    }

    div {
        flex: 0 0 52px;
        overflow:hidden;
        text-align:center;
        width:100px;
    }

`;

const FileTypeIcon = (props : { file : File}) => {
  const { file } = props;
  const type = getFileType(file);

  switch (type) {
    case FileType.Image: return <Image size={40} />;
    case FileType.Video: return <Film size={40} />;
    case FileType.Pdf: return <Pdf size={40} />;
    default: return <Doc size={40} />;
  }
};
