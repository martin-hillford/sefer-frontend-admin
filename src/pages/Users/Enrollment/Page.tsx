import { JumbotronLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { EnrollmentDetails } from 'types/data/enrollments/EnrollmentDetails';
import { Content } from './Content';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useGet } from 'sefer-fetch';

export const Page = (props : { enrollmentId : number}) => {
  const { enrollmentId } = props;
  const terms = useLocalization(localization);
  const enrollment =  useGet<EnrollmentDetails>(`/admin/enrollments/${enrollmentId}`);
  const crumbs = useCrumbs(enrollment);

  const text = { title: terms.title, subTitle: terms.subTitle };
  return (
    <JumbotronLayout overflow="auto" icon={<Education size={13} />} {...text} crumbs={crumbs}>
      {!enrollment && <Loading variant="huge" />}
      {enrollment && <Content enrollment={enrollment} />}
    </JumbotronLayout>
  );
};

const useCrumbs = (enrollment : EnrollmentDetails | null | undefined) => {
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.enrollments, link: '/enrollments' }] as BreadCrumb[];

  if (!enrollment) crumbs.push({ label: terms.students, link: '/users/students' });
  else {
    const studentLabel = terms.studentWithName.replace('@name', enrollment.student.name);
    const lessonsLabel = terms.lessonsWithName.replace('@course', enrollment.course.name);
    crumbs.push({ label: studentLabel, link: `/users/students?student=${enrollment.student.id}` },);
    crumbs.push({ label: lessonsLabel },);
  }

  return crumbs;
};
