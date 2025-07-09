import { Overlay } from 'sefer/components';
import { Remove } from 'sefer/icons';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StyledContent } from '../StyledContent';

export const FullScreen = (props : { content : string | undefined, onClose: () => void}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onClose, content } = props;
  const [label, setLabel] = useState<string>();

  useEffect(() => {
    if (!ref?.current) return () => {};

    ref.current.focus();

    const setSize = () => {
      const width = ref.current!.clientWidth;
      if (width !== undefined) setLabel(`${width - 60}px`);
    };

    setSize();
    window.addEventListener('resize', setSize);
    return () => { window.removeEventListener('resize', setSize); };
  }, [ref]);

  return (
    <Overlay>
      <Container>
        <SizeInfo>{label}</SizeInfo>
        <Close onClick={() => onClose()}>
          <Remove size={28} />
        </Close>
        <TextContainer ref={ref}>
          <StyledContent content={content} />
        </TextContainer>
      </Container>
    </Overlay>
  );
};

const Container = styled.div`
    background-color: white;
    border: 1px solid #dddddd;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextContainer = styled.div`
    padding: 30px;
    overflow: auto;
    max-width: 1110px;
    height: calc(100% - 40px);
    margin-top:40px;
`;

const Close = styled.div`
    position: absolute;
    z-index: 12;
    right:22px;
    top:22px;
    cursor: pointer;
`;

const SizeInfo = styled.div`
    position: absolute;
    z-index: 11;
    width:100%;
    text-align: center;
    font-weight: bold;
    top:22px;
`;
