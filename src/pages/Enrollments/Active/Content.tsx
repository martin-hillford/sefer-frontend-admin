import { Bold, EntitiesPanel } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mentor } from 'types/data/users/Mentor';
import { Details } from './Details';
import EnrollmentSummary from './EnrollmentSummary';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Content = (props : { enrollments : EnrollmentSummary[], mentors : Mentor[], refresh: () => void }) => {
  const { enrollments, mentors, refresh } = props;
  const [selected, setSelected] = useState<EnrollmentSummary>();
  const navigate = useNavigate();
  const onCreateSubscription = () => navigate('/enrollments/create');
  const terms = useLocalization(localization);

  const details = <Details enrollment={selected} mentors={mentors} refresh={refresh} />;
  return (
    <EntitiesPanel<EnrollmentSummary>
      data={enrollments}
      name="enrollments"
      header={terms.activeEnrollments}
      onSelect={setSelected}
      onRenderItem={onRender}
      onAddLabel={terms.enrollment}
      onAdd={onCreateSubscription}
      children={details}
    />
  );
};

const onRender = (enrollment : EnrollmentSummary) => {
  const label = `${enrollment.studentName} ${enrollment.courseName} ${enrollment.mentorName}`;
  const child = (
    <div>
      <Bold>{enrollment.studentName}</Bold><br />
      <span>{enrollment.courseName}</span>
    </div>
  );

  return { label, child };
};
