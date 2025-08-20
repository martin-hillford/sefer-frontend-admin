import { Course } from '../../../types/data/Course';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useDeleteCourse } from './useDeleteCourse';
import { Button, ButtonGroup, DeleteButton } from 'sefer/components';
import { Edit } from 'sefer/icons';

export const Buttons = ({ course, onDeleted } : {course : Course | undefined, onDeleted: (courseId: number) => void }) => {
  const terms = useLocalization(localization);
  const deleteCourse = useDeleteCourse();

  if (!course) return null;
  return (
    <ButtonGroup $pull="right">
      <Button link={`/courses/prerequisites/${course.id}`}>{terms.prerequisites}</Button>
      <Button link={`/courses/revisions/${course.id}`}>{terms.revisions}</Button>
      <Button link={`/courses/mentors/${course.id}`}>{terms.mentors}</Button>
      <Button link={`/courses/edit/${course.id}`} icon={<Edit size={16} />}>{terms.edit}</Button>
      <DeleteButton
        onDelete={() => deleteCourse(course.id)}
        {...terms.deleteButton}
        disabled={!course.isDeletable}
        onClosed={() => onDeleted(course.id)}
      />
    </ButtonGroup>
  );
};
