import { Button, EntitiesPanel, EntityForm, JumbotronLayout } from 'sefer/components';
import { Education, Stats } from 'sefer/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from 'types/data/Course';
import CourseDisplay from './CourseDisplay';
import { useFetchCourses } from 'hooks/useFetchCourses';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { Buttons } from './Buttons';
import { NoCourses } from './NoCourses';

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


  if(courses?.length === 0) return <NoCourses />

  const buttons = <Buttons course={selected} onDeleted={onDeleted} />;
  return (
    <JumbotronLayout icon={<Education size={13} />} {...terms} crumbs={crumbs}>
      <EntitiesPanel<Course>
        data={courses}
        name="courses"
        additionalButtons={statsButton}
        header={terms.courses}
        onSelect={course => setSelected(course)}
        onGetLabel={getLabel}
        onAdd={addCourse}
      >
        <EntityForm buttons={buttons}>
          <CourseDisplay course={selected} />
        </EntityForm>
      </EntitiesPanel>
    </JumbotronLayout>
  );
};
