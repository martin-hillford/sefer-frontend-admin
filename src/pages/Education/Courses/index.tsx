import { Button, ButtonGroup, DeleteButton, EntitiesPanel, EntityForm, JumbotronLayout } from 'sefer/components';
import { Edit, Education, Stats } from 'sefer/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from 'types/data/Course';
import CourseDisplay from './CourseDisplay';
import { useFetchCourses } from 'hooks/useFetchCourses';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useDeleteCourse } from './useDeleteCourse';

const getLabel = (course : Course) => course.name;

export default () => {
  const navigate = useNavigate();
  const terms = useLocalization(localization);
  const { courses, setCourses } = useFetchCourses();
  const crumbs = [{ label: terms.courses }];
  const [selected, setSelected] = useState<Course>();

  const addCourse = () => navigate('/courses/edit/');
  const onViewStats = () => navigate('/stats/courses');
  const statsButton = <Button onClick={onViewStats} icon={<Stats size={18} />} />;

  const onDeleted = async (courseId: number) => {
    if (!courses) return;
    const updated = courses.filter(c => c.id !== courseId);
    setCourses(updated);
    setSelected(updated[0]);
  };

  const buttons = <Buttons course={selected} onDeleted={onDeleted} />;
  return (
    <JumbotronLayout icon={<Education size={13} />} {...terms} crumbs={crumbs}>
      <EntitiesPanel<Course>
        data={courses}
        name="courses"
        additionalButtons={statsButton}
        header={terms.courses}
        onSelect={course => setSelected(course)}
        onGetLabel={getLabel} onAdd={addCourse}
      >
        <EntityForm buttons={buttons}>
          <CourseDisplay course={selected} />
        </EntityForm>
      </EntitiesPanel>
    </JumbotronLayout>
  );
};

const Buttons = ({ course, onDeleted } : {course : Course | undefined, onDeleted: (courseId: number) => void }) => {
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
