import { Bold, Line } from 'sefer/components';
import { ContentBlock } from 'types/data/ContentBlock';
import { Content } from './Content';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const MediaTitle = (props : { block : ContentBlock}) => {
  const { block } = props;
  const terms = useLocalization(localization);

  if (!block.content || block.content === '') return <br />;

  return (
    <>
      <br />
      <Bold>{terms.caption}</Bold>
      <Line $margin={10} />
      <Content block={block} />
      <Line />
    </>
  );
};
