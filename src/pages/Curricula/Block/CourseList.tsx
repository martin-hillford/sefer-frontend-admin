import { List, ListGroupItem } from 'sefer/components';
import { CourseBase } from 'types/data/CourseBase';
import { BlockProps } from './BlockProps';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';

export const CourseList = (props : BlockProps & { error: boolean }) => {
  const { block, error } = props;
  const hasCourses = block.data.courses && block.data.courses.length >= 1;
  const terms = useLocalization(localization);

  if (!hasCourses && error) return <ListGroupItem error>{terms.blockMustHaveAtLeastOneCourse}</ListGroupItem>;
  if (!hasCourses) return <ListGroupItem>{terms.blockHasNoCourses}</ListGroupItem>;

  return (
    <List
      items={block.data.courses as CourseBase[]}
      getLabel={c => c.name}
      onSelect={() => {}}
      stretch={false}
    />
  );
};
