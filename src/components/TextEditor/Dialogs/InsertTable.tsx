import { ConfirmDialog, Header, Switch, TextField } from 'sefer/components';
import { useState } from 'react';
import styled from 'styled-components';
import { Colors } from 'sefer/types/Colors';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type TableProps = {
    onInsert: (value : string) => void;
    onClose: () => void;
}

export const InsertTable = (props : TableProps) => {
  const { onInsert, onClose } = props;
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const terms = useLocalization(localization);

  const onInsertLink = () => {
    const table = getText(rows, columns, hasHeader, isHeaderCollapsed);
    onInsert(table);
  };

  const content = (
    <Wrapper>
      <Column>
        <Header variant="medium">Structuur</Header>
        <TextField label={terms.rows} type="number" value={rows} name="rows" onChange={setRows} />
        <TextField label={terms.columns} type="number" value={columns} name="columns" onChange={setColumns} />
        <Switch label={terms.withHeader} value={hasHeader} onChange={setHasHeader} name="hasHeader" />
        <Switch
          label={terms.collapsedHeader}
          value={hasHeader && isHeaderCollapsed}
          onChange={value => { setIsHeaderCollapsed(hasHeader && value); }}
          name="isHeaderCollapsed"
        />
      </Column>
      <Separator />
      <Column>
        <Header variant="medium">{terms.external}</Header>
        <TablePreview rows={rows} columns={columns} header={hasHeader} collapsed={isHeaderCollapsed} />
      </Column>
    </Wrapper>
  );
  return (
    <ConfirmDialog
      header={terms.insertTable}
      content={content}
      buttonText={terms.insert}
      onConfirmed={onInsertLink}
      onCanceled={onClose}
      variant="primary"
      speed={0}
    />
  );
};

const Wrapper = styled.div`
    min-width: 720px;
    display: flex;
    padding: 0 7px;
`;

const Separator = styled.div`
    flex : 0 0 20px;
`;

const Column = styled.div`
    flex : 0 0 350px;
`;

const TablePreview = (props : { columns: number, rows: number, header: boolean, collapsed: boolean }) => {
  const { columns, header, collapsed, rows } = props;

  const elements = [];
  for (let index = 0; index < rows; index++) {
    elements.push(<Row key={index} header={false} columns={columns} />);
  }

  return (
    <StyledTable>
      <tbody>
        {header && collapsed && <tr className="header"><td colSpan={columns}>&nbsp;</td></tr>}
        {header && !collapsed && <Row header columns={columns} /> }
        {elements}
      </tbody>
    </StyledTable>
  );
};

const Row = (props : { columns: number, header: boolean }) => {
  const { columns, header } = props;
  const cols = [];
  for (let index = 0; index < columns; index++) {
    cols.push(<td key={index}>&nbsp;</td>);
  }

  return (
    <tr className={header ? 'header' : undefined}>{columns}</tr>
  );
};

const StyledTable = styled.table`
    border : 1px solid rgba(0, 0, 0, 0.1);
    border-spacing: 0;
    border-collapse: collapse;
    margin: 14px 0;
    width: 100%;

    tr.header td {
      background-color: ${Colors.Blue};
      color:white
    }

    td {
      padding: 2px 6px;
      border : 1px solid rgba(0, 0, 0, 0.1);
    }
`;

const getText = (rows: number, columns: number, header: boolean, collapsed: boolean) => {
  let text = '\n';
  const column = '     |';
  const head = ' --- |';

  if (header && collapsed) text += `|${' '.repeat(column.length * columns - 1)}|\n`;
  if (header && !collapsed) text += `|${column.repeat(columns)}\n`;
  if (header) text += `|${head.repeat(columns)}\n`;

  for (let index = 0; index < rows; index++) {
    text += `|${column.repeat(columns)}\n`;
  }

  return text;
};
