import { Bold, Line } from 'sefer/components';
import { ContentBlock } from 'types/data/ContentBlock';
import { Content } from './Content';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { StyledContent } from 'components';

export const Question = (props : { block : ContentBlock}) => {
  const { block } = props;
  const terms = useLocalization(localization);
  const isOpenQuestion = block.type === 'QuestionOpen';

  return (
    <>
      <Bold>{terms.answerExplanation}</Bold>
      <Line $margin={10} />
      <StyledContent content={block.answerExplanation ?? '-'} />
      <br />

      {isOpenQuestion && <Bold>{terms.exactAnswer}</Bold>}
      {isOpenQuestion && <Line $margin={10} />}
      {isOpenQuestion && <><div>{block.exactAnswer ?? '-'}</div><br /></>}

      <Bold>{terms.question}</Bold>
      <Line $margin={10} />
      <Content block={block} />
      <Line />
    </>
  );
};
