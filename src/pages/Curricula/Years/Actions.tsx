import { BackNoSaveButton, Button, ButtonGroup, DeleteButton, SortingButton } from 'sefer/components';
import { Minus, Pencil, Plus } from 'sefer/icons';
import { useNavigate } from 'react-router-dom';
import { Block, CurriculumWithRevisions as Curriculum } from 'types/data/curricula/Revision';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type Props = {
  curriculum: Curriculum | undefined | null,
  blocks: Block[] | undefined | null,
  year: number,
  deleteBlock: (blockId: number) => Promise<boolean>,
  refresh: () => void,
  sorted: (blocks: Block[]) => Promise<boolean>;
  selected : Block | undefined;
  sorting: boolean;
  setSorting: (value: boolean) => void;
}

export const Actions = (props: Props) => {
  const { curriculum, blocks, year, deleteBlock, refresh, sorted, selected, sorting, setSorting } = props;
  const hasBlocks = blocks && blocks.length !== 0;
  const navigate = useNavigate();
  const terms = useLocalization(localization);

  const add = () => navigate(`/curricula/revisions/${curriculum?.id}/blocks/add?year=${year}`);
  const edit = () => navigate(`/curricula/revisions/${curriculum?.id}/blocks/${selected?.id}?year=${year}`);

  const onDelete = async () => {
    if (!selected) return false;
    return deleteBlock(selected?.id);
  };

  if(!curriculum || !blocks) return null;
  return (
    <ButtonGroup $pull="right">
      <BackNoSaveButton
        url={`/curricula/revisions/${curriculum.id}`}
        onHasChanges={() => sorting}
      />
      <Button onClick={add} icon={<Plus size={20} />} />
      <Button onClick={edit} disabled={!selected} icon={<Pencil size={20} />} />
      <SortingButton
        setSorting={setSorting}
        sorting={sorting}
        saved={terms.sortingSaved}
        saving={terms.sortingSaved}
        save={async () => { await sorted(blocks)}}
        disabled={!hasBlocks}
        onClosed={() => refresh()}
      />
      <DeleteButton
        icon={<Minus size={20} />}
        onDelete={onDelete}
        confirm={terms.deleteConfirm}
        deleted={terms.blockDeleted}
        deleting={terms.blockDeleting}
        header={terms.deleteHeader}
        disabled={!selected}
        onClosed={() => refresh()}
      />
    </ButtonGroup>
  );
};
