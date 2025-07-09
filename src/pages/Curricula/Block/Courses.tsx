import { Container, DivisionList } from 'sefer/components';
import { CourseBase } from 'types/data/CourseBase';
import { BlockProps } from './BlockProps';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Courses = (props : BlockProps & { toOverView: () => void }) => {
  const { toOverView, block, courses } = props;
  const terms = useLocalization(localization);

  const onSave = (data: CourseBase[], availableCourses: CourseBase[]) => {
    const updated = { ...block.data, courses: data, availableCourses };
    block.set(updated);
    toOverView();
  };

  const available = block.data.availableCourses ?? [];
  const selected = block.data.courses ?? courses;
  const header = `Cursussen voor: ${block.data.name}`;

  return (
    <Container>
      <DivisionList
        available={available}
        getEntityLabel={course => course.name}
        selected={selected}
        availableLabel={terms.courses}
        selectedLabel={terms.assignedCourses}
        header={header}
        onSave={onSave}
        saveLabel={terms.ready}
      />
    </Container>
  );
};
