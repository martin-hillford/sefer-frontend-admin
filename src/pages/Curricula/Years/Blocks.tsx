import { Container, Header, Line, ListGroupItem } from 'sefer/components';
import { useState } from 'react';
import { Block, CurriculumWithRevisions as Curriculum } from 'types/data/curricula/Revision';
import { Actions } from './Actions';
import { BlockList } from './BlockList';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type Props = {
    curriculum: Curriculum | undefined | null,
    blocks: Block[] | undefined | null,
    year: number,
    deleteBlock: (blockId: number) => Promise<boolean>,
    refresh: () => void,
    sorted: (blocks: Block[]) => Promise<boolean>;
    setBlocks: (blocks: Block[]) => void;
}

export const Blocks = (props: Props) => {
  const { curriculum, blocks, year, deleteBlock, refresh, sorted, setBlocks } = props;
  const [selected, setSelected] = useState<Block | undefined>(undefined);
  const [sorting, setSorting] = useState(false);
  const hasBlocks = blocks && blocks.length !== 0;
  const terms = useLocalization(localization);

  if(!curriculum || !blocks) return null;
  return (
    <Container>
      <Header variant="large">{terms.blocks}</Header>
      {!hasBlocks && <ListGroupItem children={terms.noBlocks} />}
      <BlockList
        blocks={blocks}
        selected={selected}
        setSelected={setSelected}
        sorting={sorting}
        setBlocks={setBlocks}
      />
      <Line />
      <Actions
        curriculum={curriculum}
        blocks={blocks}
        year={year}
        deleteBlock={deleteBlock}
        refresh={refresh}
        sorted={sorted}
        selected={selected}
        setSorting={setSorting}
        sorting={sorting}
      />
    </Container>
  );
};
