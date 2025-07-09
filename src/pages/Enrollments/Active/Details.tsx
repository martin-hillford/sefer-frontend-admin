import { Mentor } from 'types/data/users/Mentor';
import { Boolean, DateLabel, EntityForm, Loading, Property } from 'sefer/components';
import { Actions } from './Actions';
import EnrollmentSummary from './EnrollmentSummary';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Details = (props : { enrollment? : EnrollmentSummary, mentors : Mentor[], refresh : () => void }) => {
  const { enrollment } = props;
  const terms = useLocalization(localization);

  if (!enrollment) return <Loading variant="medium" />;

  const buttons = <Actions {...props} enrollment={enrollment} />;
  const progress = Math.round(((enrollment.submitted ?? 0) / enrollment.lessonCount) * 100);

  return (
    <EntityForm buttons={buttons}>
      <Property label={terms.courseName}>{enrollment.courseName}</Property>
      <Property label={terms.studentName}>{enrollment.studentName}</Property>
      <Property label={terms.lessonCount}>{enrollment.lessonCount}</Property>
      <Property label={terms.enrollmentDate}>
        <DateLabel value={enrollment.creationDate} />
      </Property>
      <Property label={terms.completedLessons}>
        {enrollment.submitted ?? 0}
        &nbsp;
        ({progress}%)
      </Property>
      <Property label={terms.selfStudy}>
        <Boolean size={14} value={enrollment.isSelfStudy} />
      </Property>
      <Property label={terms.mentor}>
        {enrollment.isSelfStudy && '-'}
        {!enrollment.isSelfStudy && enrollment.mentorName}
      </Property>
    </EntityForm>
  );
};
