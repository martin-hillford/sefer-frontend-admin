import styled from 'styled-components';
import { LightBox } from 'sefer/components';

export const Image = (props : { src : string | undefined }) => {
  const { src } = props;

  if (!src) return <Box />;
  return (
    <Box>
      <ImgBox>
        <LightBox border={false} src={src} />
      </ImgBox>
    </Box>
  );
};

const Box = styled.div`
    width: 210px;
`;

const ImgBox = styled.div`
    display: inline-block;
    margin-right: 10px;
    max-width: 210px;

    img {
        max-width: 200px;
        max-height: 160px;
        cursor: pointer;
        float: left;
        display: table-cell;
    }
`;
