import { ReactNode } from 'react';
import styled from 'styled-components';
import { Colors } from 'sefer/types/Colors';

export default ({ children } : {children : ReactNode}) => (
  <Message>
    <Text>{children}</Text>
  </Message>
);

const Text = styled.div`
    color:white;
    font-size: 32px;
    max-width: 1000px;
`;

const Message = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${Colors.Blue};

    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
