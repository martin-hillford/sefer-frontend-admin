import { Signal } from 'sefer/components';
import styled from 'styled-components';
import { ContentBlock } from 'types/data/ContentBlock';
import { BlockSettings } from './BlockSettings';
import { BlockLabel } from 'components';

export const Block = (props : { block : ContentBlock }) => {
  const { block } = props;

  return (
    <Container>
      <Header>
        <Signal state={getState(block)} />
        &nbsp;&nbsp;
        <BlockLabel block={block} />
      </Header>
      <BlockSettings block={block} />
    </Container>
  );
};

const Container = styled.div`
    padding: 0 30px;
`;

const getState = (block : ContentBlock) => {
  if (!block.isMarkDownContent) return 'red';
  return 'green';
};

const Header = styled.div`
    color: black;
    padding: 15px;
    margin: -15px -15px 15px;
    height: 55px;
    line-height: 25px;
    font-weight: bold;
`;
