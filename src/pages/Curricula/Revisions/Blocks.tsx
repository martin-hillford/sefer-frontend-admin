import { Button, ButtonGroup, DeleteButton, Header, Line, List, ListGroupItem, SortingButton } from 'sefer/components';
import { Minus, Pencil, Plus } from 'sefer/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Block, CurriculumWithRevisions } from 'types/data/curricula/Revision';
import { RevisionProps } from './RevisionProps';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Blocks = (props: RevisionProps) => {
  const { curriculum, sorted, deleteBlock, refresh } = props;
  const terms = useLocalization(localization);
  const [selected, setSelected] = useState<Block | undefined>();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [sorting, setSorting] = useState(false);
  const navigate = useNavigate();

  const add = () => navigate(`/curricula/revisions/${curriculum.id}/blocks/add`);
  const edit = () => navigate(`/curricula/revisions/${curriculum.id}/blocks/${selected?.id}`);

  useEffect(() => {
    const { items, first } = get(curriculum);
    setSelected(first);
    setBlocks(items);
  }, [curriculum]);

  const isEmpty = blocks.length === 0;

  return (
    <>
      <Header variant="large">{terms.blocks}</Header>
      <List
        items={blocks}
        getLabel={b => b.name}
        onSelect={setSelected}
        sorting={sorting}
        onSorted={setBlocks}
        selected={selected}
        stretch={false}
      />
      {isEmpty && <ListGroupItem>{terms.noBlocks}</ListGroupItem>}
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={add} disabled={sorting} icon={<Plus size={20} />} />
        <Button onClick={edit} disabled={!selected || sorting} icon={<Pencil size={20} />} />
        <SortingButton
          setSorting={setSorting}
          sorting={sorting}
          saved={terms.orderSaved}
          saving={terms.orderSaving}
          save={async () => { await sorted(blocks); }}
          disabled={isEmpty}
          onClosed={() => refresh()}
        />
        <DeleteButton
          icon={<Minus size={20} />}
          onDelete={() => deleteBlock(selected)}
          confirm={terms.confirmDeleteBlock}
          deleted={terms.blockDeleted}
          deleting={terms.blockDeleting}
          header={terms.deleteBlockHeader}
          disabled={!selected || sorting}
          onClosed={() => refresh()}
        />
      </ButtonGroup>
    </>
  );
};

const get = (curriculum: CurriculumWithRevisions) => {
  if (!curriculum?.editingRevision?.blocks) return { items: [] as Block[], first: undefined };
  const first = curriculum.editingRevision.blocks[0];
  return { items: curriculum.editingRevision.blocks, first };
};
