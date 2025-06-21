import styled from 'styled-components';
import { Colors } from 'sefer/types/Colors';

export const Button = styled.div`
    &:hover { color : ${Colors.Blue}};
    cursor: pointer;
    margin-left: 1px;
`;
