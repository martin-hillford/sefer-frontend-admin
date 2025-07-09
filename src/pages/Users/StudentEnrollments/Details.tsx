import { Boolean, DateLabel, EntityForm, Property } from 'sefer/components';
import { Enrollment } from 'types/data/enrollments/Enrollment';
import { Mentor } from 'types/data/users/Mentor';
import { Student } from 'types/data/users/Student';
import { Actions } from './Actions';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  enrollment: Enrollment,
  onEnrollmentChanged: (enrollment: { id: number; isActive: boolean; }) => void,
  mentors: Mentor[]
  student : Student
}

const Details = (props : Props) => {
  const { enrollment } = props;
  const buttons = <Actions {...props} />;
  const terms = useLocalization(localization);

  return (
    <EntityForm buttons={buttons}>
      <Property label={terms.course}>{enrollment.course.name}</Property>
      <Property label={terms.active}>
        <Boolean size={16} value={enrollment.isActive} />
      </Property>
      <Property label={terms.allowRetake}>
        <Boolean size={16} value={enrollment.canStudentReEnroll} />
      </Property>
      <Property label={terms.numberOfLessons}>{enrollment.lessonCount}</Property>
      <Property label={terms.subscriptionDate}>
        <DateLabel value={enrollment.enrollmentDate} empty="-" />
      </Property>
      <Property label={terms.completed}>
        <Boolean size={16} value={enrollment.isCourseCompleted} />
      </Property>
      <Property label={terms.onPaper}>
        <Boolean size={16} value={enrollment.onPaper} />
      </Property>
      <Property label={terms.legacy}>
        <Boolean size={16} value={enrollment.imported} />
      </Property>
      <Property label={terms.completedLessons}>
        {enrollment.lessonCompletedCount}&nbsp;({enrollment.progress}%)
      </Property>
      <Property label={terms.grade}>
        {enrollment.grade ?? '-'}
      </Property>
      <Property label={terms.selfStudy}>
        {enrollment.isSelfStudy && <span>{terms.selfStudy}</span> }
        {!enrollment.isSelfStudy && <span>{enrollment.mentorName}</span> }
      </Property>
      <Property label={terms.closureDate}>
        <DateLabel value={enrollment.closureDate} empty="-" />
      </Property>
    </EntityForm>
  );
};

export default Details;
