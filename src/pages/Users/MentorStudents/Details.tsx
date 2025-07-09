import { Boolean, DateLabel, Property } from 'sefer/components';
import { Link } from 'react-router-dom';
import { MentorStudent } from 'types/data/users/MentorStudents';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Details = (props: { student?: MentorStudent }) => {
  const { student } = props;
  const terms = useLocalization(localization);

  if (!student) return null;
  return (
    <>
      <Property label={terms.name}>
        <Link to={`/users/students?student=${student.id}`}>{student.name}</Link>
      </Property>
      <Property label={terms.email}>{student.name}</Property>
      <Property label={terms.hasAccess}>
        <Boolean size={24} value={student.hasAccess} />
      </Property>
      <Property label={terms.course}>{student.course}</Property>
      <Property label={terms.subscriptionDate}>
        <DateLabel value={student.subscriptionDate} />
      </Property>
      <Property label={terms.completedLessons}>{student.completedLessons?.toString() ?? '0'}</Property>
      <Property label={terms.reviewedLessons}>{student.reviewedLessons?.toString() ?? '0'}</Property>
    </>
  );
};
