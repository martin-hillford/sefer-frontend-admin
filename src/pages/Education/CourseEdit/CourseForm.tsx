import { BaseLayout, Jumbotron } from 'sefer/components';
import { Education } from 'sefer/icons';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Course } from 'types/data/Course';
import { CourseFormContent } from './CourseFormContent';
import { CourseSaved } from './CourseSaved';
import { CourseSaving } from './CourseSaving';
import { useSaveCourse } from './useSaveCourse';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const CourseForm = (props : { course : Course | null | undefined }) => {
  const [state, setState] = useState<string>('edit');
  const [progress, setProgress] = useState<number>(0);
  const { course } = props;
  const saveCourse = useSaveCourse();
  const crumbs = useCrumbs(course);
  const terms = useLocalization(localization);

  const onSave = (data: Course) => saveCourse(data, setProgress, setState);

  return (
    <BaseLayout crumbs={crumbs} title={terms.title} subTitle={terms.subTitle} icon={<Education size={13} />}>
      <Jumbotron>
        {course === null && <span>{terms.notFound}</span> }
        {course === undefined && <span>{terms.loading}</span> }
        {course && <CourseFormContent course={course} onSave={onSave} onCancel={() => setState('canceled')} /> }
      </Jumbotron>
      { state === 'save' && <CourseSaving content={terms.saving} progress={progress} /> }
      { state === 'saved' && <CourseSaved content={terms.saved} /> }
      { state === 'canceled' && <Navigate to="/courses" /> }
    </BaseLayout>
  );
};

const useCrumbs = (course: Course | null | undefined) => {
    const terms = useLocalization(localization);

    let label = terms.courseLoading;
    if (course && course.id === 0) label = terms.addCourse
    if (course && course.id > 0) label = terms.courseName.replace("@name", course.name);

  return [
    { label: terms.courses, link: '/courses' },
    { label }
  ];
}
