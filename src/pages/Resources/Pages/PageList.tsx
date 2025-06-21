import { List } from 'sefer/components';
import { useState } from 'react';
import styled from 'styled-components';
import { Page } from 'types/data/resources/Page';
import { Actions } from './Actions';

export const PageList = (props : { pages : Page[], type : string, refresh : () => void, onSorted : (items: Page[]) => void }) => {
  const { type, pages, onSorted } = props;
  const [selected, setSelected] = useState<Page>();
  const [sorting, setSorting] = useState(false);
  const sortable = type === 'menu';
  const hasItems = pages.length !== 0;

  return (
    <>
      <Container $hasBorder={hasItems}>
        <List
          items={pages}
          getLabel={p => p.name}
          sorting={sortable && sorting}
          border={false}
          onSelect={setSelected}
          onSorted={e => onSorted(e)}
        />
      </Container>
      <Actions {...props} selected={selected} setSorting={setSorting} sorting={sorting} />
    </>
  );
};

const Container = styled.div<{$hasBorder : boolean}>`
    border-color: #dddddd;
    border-style: solid;
    border-width: ${p => (p.$hasBorder ? 1 : 0)}px;
    border-bottom-width: 0;
    margin-bottom: ${p => (p.$hasBorder ? 16 : 0)}px;
`;
