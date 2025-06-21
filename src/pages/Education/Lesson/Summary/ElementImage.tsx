import { ContentBlock } from 'types/data/ContentBlock';
import { LightBox, Property } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export const ElementImage = (props : { block : ContentBlock}) => {
  const { block } = props;
  const terms = useLocalization(localization);
  return (
    <Property label={terms.image}>
      <LightBox alt={block.content} src={block.url} />
    </Property>
  );
};
