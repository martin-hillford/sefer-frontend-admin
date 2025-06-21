import { DragEventHandler, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    children : ReactNode,
    onClick? : () => void
    onDrop? : DragEventHandler<HTMLDivElement>
    onDragOver? : DragEventHandler<HTMLDivElement>
}

export const Panel = (props : Props) => {
  const { children, onClick, onDrop, onDragOver } = props;

  const onWrapperClick = () => {
    if (onClick) onClick();
  };

  return (
    <Wrapper onClick={onWrapperClick} onDrop={onDrop} onDragOver={onDragOver}>
      <ScrollPanel>
        {children}
      </ScrollPanel>
    </Wrapper>
  );
};

const ScrollPanel = styled.div`
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    overflow-y: auto;
`;

const Wrapper = styled.div`
    display: block;
    position: relative;
    flex: 1 1 auto;
`;