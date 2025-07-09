import { StudentEnrollments } from 'types/data/users/StudentEnrollments';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const useBreadCrumbs = (loaded : boolean, data : StudentEnrollments | undefined | null) => {
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.users, link: '/users' }] as BreadCrumb[];
  const userId = data?.student.id;

  if (!loaded) crumbs.push({ label: terms.students, link: `/users/students?student=${userId}` },);
  else {
    const label = terms.studentWithName.replace('@name', data?.student.name ?? '');
    crumbs.push({ label, link: `/users/students?student=${userId}` },);
  }

  crumbs.push({ label: terms.enrollments });

  return crumbs;
};
