import { Button, ButtonGroup, DeleteButton } from 'sefer/components';
import { Pencil, Plus, Trash } from 'sefer/icons';
import { useNavigate } from 'react-router-dom';
import { Page } from 'types/data/resources/Page';
import { PageType } from 'types/data/resources/PageType';
import { SortingButton } from './SortingButton';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useDeletePage } from './useDeletePage';

interface Props {
  pages: Page[],
  type: string,
  refresh: () => void,
  selected: Page | undefined,
  sorting: boolean,
  setSorting: (value:boolean) => void
}

export const Actions = (props: Props) => {
  const { pages, type, selected, refresh } = props;
  const navigate = useNavigate();
  const sortable = type === 'menu';
  const hasItems = pages.length !== 0;
  const collectionEditable = type !== 'special';
  const deletePage = useDeletePage();

  const addType = type === 'menu' ? PageType.MenuPage : PageType.IndividualPage;
  const edit = () => navigate(`/content/pages/${selected?.id}`);
  const add = () => navigate(`/content/pages/create?type=${addType}`);

  const onDelete = async () => {
    if(!selected) return false;
    await deletePage(selected.id);
    return true;
  };

  const canDelete = collectionEditable && !!selected;

  return (
    <ButtonGroup $pull="right">
      {collectionEditable && <Delete onDelete={onDelete} disabled={!canDelete} refresh={refresh} />}
      {hasItems && <Button disabled={!selected} onClick={edit} icon={<Pencil size={20} />} />}
      {collectionEditable && <Button onClick={add} icon={<Plus size={20} />} />}
      {sortable && <SortingButton {...props} />}
    </ButtonGroup>
  );
};

const Delete = (props: { refresh: () => void, disabled: boolean, onDelete: () => Promise<boolean> }) => {
  const { refresh, disabled, onDelete } = props;
  const terms = useLocalization(localization);
  return (
    <DeleteButton
      header={terms.deleteHeader}
      confirm={terms.deleteConfirmation}
      deleting={terms.deletingContent}
      deleted={terms.deletedContent}
      onDelete={onDelete}
      disabled={disabled}
      icon={<Trash size={16} />}
      onClosed={refresh}
    />
  );
};
