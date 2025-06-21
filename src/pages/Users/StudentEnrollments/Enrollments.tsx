import { EntitiesNotFound, EntitiesPanel } from 'sefer/components';
import { useState } from 'react';
import { Enrollment } from 'types/data/enrollments/Enrollment';
import { Mentor } from 'types/data/users/Mentor';
import { StudentEnrollments } from 'types/data/users/StudentEnrollments';
import Details from './Details';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default (props : { data : StudentEnrollments, onEnrollmentChanged : () => void, mentors : Mentor[] }) => {
  const { data } = props;
  const [selected, setSelected] = useState<Enrollment>();
  const terms = useLocalization(localization);

  if (data?.enrollments?.length === 0) return <EntitiesNotFound header={terms.header} content={terms.noEnrollments} />;
  return (

    <EntitiesPanel<Enrollment>
      data={data.enrollments}
      name="student-enrollments"
      header={terms.header}
      onSelect={setSelected}
      onGetLabel={u => u.course.name}
    >
      {selected && <Details {...props} enrollment={selected} student={data.student} />}
    </EntitiesPanel>
  );
};
