import { Refresh } from 'sefer/icons';
import styled from 'styled-components';
import { Directory } from 'types/data/Directory';
import { Colors } from 'sefer/types/Colors';

export const ToolBar = styled.div`
    border-bottom: 1px solid #ddd!important;
    background: white;
    display: flex;
    align-items: flex-start;
    flex: 0 0 54px;
`;

export const Button = styled.div<{disabled? : boolean}>`
    flex: 0 0 auto;
    color: ${p => (p.disabled ? '#CCCCCC' : Colors.Blue)};
    height: 53px;
    display: flex;
    font-size: 14px;
    padding:0 15px;
    line-height: 53px;
    box-sizing: border-box;
    cursor: pointer;
    
    & :nth-child(2) {
        padding-left: 4px;
    }

    &:hover {
        background-color: ${p => (p.disabled ? 'white' : '#eeeeee')};
    }
`;

export const RefreshButton = (props : { directory? : Directory, onPathSelected : (path : string) => void}) => {
  const { onPathSelected, directory } = props;
  const onRefresh = () => {
    if (directory) onPathSelected(directory.path);
  };
  return (
    <Button disabled={!directory} onClick={onRefresh}>
      <Refresh size={IconSize} />
    </Button>
  );
};

export const IconSize = 22;

export const Item = styled.div`
    background-color: #ffffff;
    border-bottom: 1px solid #dddddd;
    padding: 15px;
    font-size: 13px;
    line-height: 24px;
    border-collapse: collapse;
    display: block;
`;
