import { Block } from 'types/data/curricula/Revision';
import { List } from 'sefer/components';

interface Props {
  blocks: Block[] | undefined | null,
  selected: Block | undefined,
  setSelected: (block: Block | undefined) => void,
  sorting: boolean,
  setBlocks: (blocks: Block[]) => void,
}

export const BlockList = (props: Props) => {
  const { blocks, selected, setSelected, sorting, setBlocks } = props;
  if(!blocks || blocks.length === 0) return null;
  return <List
    items={blocks}
    getLabel={b => b.name}
    selected={selected}
    onSelect={setSelected}
    stretch={false}
    sorting={sorting}
    onSorted={setBlocks}
  />
}
