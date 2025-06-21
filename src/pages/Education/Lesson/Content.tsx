import { Button, ButtonGroup, Header, List } from 'sefer/components';
import * as Icons from 'sefer/icons';
import { useAdminFrontendConfig } from 'hooks/useAdminFrontendConfig';
import { useState } from 'react';
import { ContentBlock } from 'types/data/ContentBlock';
import { ContentBlockType } from 'types/data/ContentBlockType';
import { Entity } from 'types/data/Entity';
import { Lesson } from 'types/data/Lesson';
import { DataContext } from 'sefer/types/DataContext';
import { Summary } from './Summary/Summary';
import { Colors } from 'sefer/types/Colors';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface ContentProps {
    lessonDataContext: DataContext<Lesson>,
    onEditBlock: (block: ContentBlock) => void
    onSorting: (sorting: boolean) => void
    convertToMarkDown: () => void
}

export const Content = (props: ContentProps) => {
  const config = useAdminFrontendConfig();
  const terms = useLocalization(localization);
  const { lessonDataContext, onEditBlock, onSorting, convertToMarkDown } = props;
  const [sorting, setSorting] = useState(false);

  const onDeleteBlock = (block: ContentBlock) => {
    const content = lessonDataContext.data.content.filter(b => b.id !== block.id);
    lessonDataContext.setValue('content', content);
  };

  const getContentBlockId = () => {
    const current = Math.min(...lessonDataContext.data.content.map(c => c.id));
    if (current >= 0) return -1;
    return current - 1;
  };

  const onAddBlock = (type: ContentBlockType) => {
    const block = {
      sequenceId: lessonDataContext.data.content.length,
      type,
      isMultiSelect: type === ContentBlockType.QuestionMultipleChoice,
      forcePageBreak: false,
      id: getContentBlockId(),
    } as ContentBlock;
    if (type === ContentBlockType.QuestionMultipleChoice) block.choices = [];
    onEditBlock(block);
  };

  const renderContentBlock = (item: Entity<ContentBlock>) => (
    <Summary
      onDelete={onDeleteBlock}
      onEdit={onEditBlock}
      block={item}
    />
  );

  const onSorted = (items: Entity<ContentBlock>[]) => {

    items.forEach((item, index) => { item.sequenceId = index; });
    lessonDataContext.setValue('content', items);
  };

  const onSortingClick = () => {
    onSorting(!sorting);
    setSorting(s => !s);
  };

  const previewLink = `${config?.publicSite}/lesson/admin-preview?${lessonDataContext.data.previewQuery}`;
  const canConvert = lessonDataContext.data.content.filter(b => !b.isMarkDownContent).length !== 0;

  return (
    <>
      <Header inline color={Colors.Blue} variant="medium">{terms.content}</Header>
      <ButtonGroup $pull="left">
        <Button active={sorting} onClick={onSortingClick}>
          <Icons.MenuHamburger size={20} />
        </Button>
        <Button
          onClick={() => { onAddBlock(ContentBlockType.ElementText); }}
          icon={<Icons.Plus size={16} />}
        >
          <Icons.Font size={20} />
        </Button>
        <Button
          onClick={() => { onAddBlock(ContentBlockType.ElementImage); }}
          icon={<Icons.Plus size={16} />}
        >
          <Icons.Image size={20} />
        </Button>
        <Button
          onClick={() => { onAddBlock(ContentBlockType.ElementVideo); }}
          icon={<Icons.Plus size={16} />}
        >
          <Icons.Video size={20} />
        </Button>
        <Button
          onClick={() => { onAddBlock(ContentBlockType.ElementYoutube); }}
          icon={<Icons.Plus size={16} />}
        >
          <Icons.YouTube size={20} />
        </Button>
        <Button
          onClick={() => { onAddBlock(ContentBlockType.ElementVimeo); }}
          icon={<Icons.Plus size={16} />}
        >
          <Icons.Vimeo size={20} />
        </Button>
        <Button
          onClick={() => { onAddBlock(ContentBlockType.QuestionOpen); }}
          icon={<Icons.Plus size={16} />}
        >
          <Icons.Pencil size={20} />
        </Button>
        <Button
          onClick={() => { onAddBlock(ContentBlockType.QuestionMultipleChoice); }}
          icon={<Icons.Plus size={16} />}
        >
          <Icons.ListOrdered size={20} />
        </Button>
        <Button
          onClick={() => { onAddBlock(ContentBlockType.QuestionBoolean); }}
          icon={<Icons.Plus size={16} />}
        >
          <Icons.True size={20} />
        </Button>
        {canConvert && <Button onClick={convertToMarkDown}><Icons.ToMarkDown size={20} /></Button>}
        <Button href={previewLink} target="_blank"><Icons.Preview size={20} /></Button>
      </ButtonGroup>
      <br />
      <List
        border={false}
        items={lessonDataContext.data.content}
        onSelect={() => {}}
        onSorted={onSorted}
        onRenderItem={renderContentBlock}
        getLabel={(entity) => entity.sequenceId.toString()}
        sorting={sorting}
      />
    </>
  );
};
