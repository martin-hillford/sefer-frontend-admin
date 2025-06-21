import { TextEditor as TextArea } from 'components';
import { BlockProps } from './BlockProps';

export const TextEditor = (props : BlockProps) => {
  const { block } = props;
  const content = block.data.content ? block.data.content : '';

  const setContent = (value : string) => {
    block.setValue('content', value);
  };

  return <TextArea content={content} setContent={setContent} />;
};
