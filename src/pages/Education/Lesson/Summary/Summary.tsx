import { ListGroupItem, Signal } from 'sefer/components';
import { ChevronDown, ChevronUp } from 'sefer/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { ContentBlock } from 'types/data/ContentBlock';
import { BlockSettings } from './BlockSettings';
import { BlockLabel } from 'components';
import styles from '../lesson.module.css';

type SummaryProps = {
    block : ContentBlock
    onEdit : (block : ContentBlock) => void
    onDelete : (block : ContentBlock) => void
}

export const Summary = (props : SummaryProps) => {
  const [extended, setExtended] = useState(false);
  const { block, onDelete, onEdit } = props;
  const classes = [ styles.summaryHeader ];
  if(extended) classes.push(styles.summaryHeaderExtended);

  return (
    <ListGroupItem style={{ marginBottom: '15px' }}>
      <div className={classes.join(' ')}>
        <div>
          <Signal state={getState(block)} />&nbsp; &nbsp;
          <BlockLabel block={block} />
        </div>
        <div>
          <Extend onClick={() => setExtended(!extended)}>
            {!extended && <ChevronDown size={24} /> }
            {extended && <ChevronUp size={24} /> }
          </Extend>
        </div>
      </div>
      {extended && <BlockSettings block={block} onDelete={onDelete} onEdit={onEdit} /> }
    </ListGroupItem>
  );
};

const getState = (block : ContentBlock) => {
  if (!block.isMarkDownContent) return 'red';
  return 'green';
};

/* const Header = styled.div<{$extended : boolean }>`
    display: flex;
    color: black;
    background-color: ${p => (p.$extended ? '#F5F5F5' : 'white')};
    justify-content: space-between;
    padding: 15px;
    margin: -15px -15px ${p => (p.$extended ? '15px' : '-15px')};
    height: 55px;
    line-height: 25px;
`;*/

const Extend = styled.span`
    cursor: pointer;
`;
