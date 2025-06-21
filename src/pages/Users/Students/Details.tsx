import { Boolean, DateLabel, Gender, Loading, Property, Role } from 'sefer/components';
import { Student } from 'types/data/users/Student';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type Extended = Student & { primaryRegion?: string, primarySite? : string }

export const Details = ({ student } : { student : Student | undefined}) => {
  const terms = useLocalization(localization);
  if (!student) return <Loading center />;
  return (
    <>
      <Property label={terms.name}>{student.name}</Property>
      <Property label={terms.gender}>
        <Gender value={student.gender} />
      </Property>
      <Property label={terms.email}>{student.email}</Property>
      <Property label={terms.primarySite}>
        {(student as Extended).primarySite}
      </Property>
      <Property label={terms.primaryRegion}>{(student as Extended).primaryRegion}</Property>
      <Property label={terms.role}>
        <Role value={student.role} />
      </Property>
      <Property label={terms.hasAccess}><Boolean size={16} value={!student.blocked} /></Property>
      <Property label={terms.activated}><Boolean size={16} value={student.approved} /></Property>
      <Property label={terms.active}><Boolean size={16} value={student.isActive} /></Property>
      <Property label={terms.subscriptionDate}>
        <DateLabel value={student.subscriptionDate} />
      </Property>
    </>
  );
};
