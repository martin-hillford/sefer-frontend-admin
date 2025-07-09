import { Bold, Line } from 'sefer/components';
import { ContentBlock } from 'types/data/ContentBlock';
import { Content } from './Content';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const Question = (props : { block : ContentBlock}) => {
  const { block } = props;
  const terms = useLocalization(localization);
  return (
    <>
      <Bold>{terms.question}</Bold>
      <Content block={block} />
      <Line />
    </>
  );
};
