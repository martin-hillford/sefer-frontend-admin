import { TextEditor as TextArea } from 'components';
import { BlockProps } from './BlockProps';

export const TextEditor = (props : BlockProps & { name: string }) => {
  const { block, name } = props;
  const data = block.data as never;
  const content = data[name] ? data[name] : '';

  const setContent = (value : string) => {
    block.setValue(name, value);
  };

  return <TextArea content={content} setContent={setContent} />;
};
