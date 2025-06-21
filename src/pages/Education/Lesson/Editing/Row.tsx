import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
    height: 40px;
    line-height: 40px;

    > div:nth-child(1) {
        flex: 1 1 auto;
        padding-right: 80px
    }

    > div:nth-child(2) {
        flex: 0 0 120px
    }

    > div:nth-child(3) {
        flex: 0 0 38px;
        display: flex;
        justify-content: right;
        padding-bottom: 4px
    }
`;
