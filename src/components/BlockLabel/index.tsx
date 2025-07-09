import { ContentBlock } from 'types/data/ContentBlock';
import { ContentBlockTypeLabel } from '../ContentBlockTypeLabel';

export const BlockLabel = (props : {block : ContentBlock}) => {
  const { block } = props;
  let label = '';
  if (block.number) label = `${block.number} `;
  if (block.heading) label += `${block.heading} `;
  return <>{label} (<ContentBlockTypeLabel type={block.type} />)</>;
};
