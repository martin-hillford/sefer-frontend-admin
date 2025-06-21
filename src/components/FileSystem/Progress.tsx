import styled from 'styled-components';
import { ProgressBar } from 'sefer/components';

export const Progress = (props : { progress? : number}) => {
  const { progress } = props;
  if (progress === undefined) return null;
  return (
    <Wrapper>
      <ProgressBar squared height={10} progress={progress} variant="primary" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
    width: 100%;
    border-top: 1px solid #ddd!important;
    background-color: white;
`;
