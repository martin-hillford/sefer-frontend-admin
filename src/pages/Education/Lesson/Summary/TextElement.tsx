import { Line } from 'sefer/components';
import { ContentBlock } from 'types/data/ContentBlock';
import { Content } from './Content';

export const TextElement = (props : { block : ContentBlock}) => {
  const { block } = props;

  return (
    <>
      <Line />
      <Content block={block} />
      <Line />
    </>
  );
};
