import { JumbotronLayout, Loading } from 'sefer/components';
import { MegaPhone } from 'sefer/icons';
import { Courses } from './Courses';
import { useFetchCourses } from 'hooks/useFetchCourses';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const { courses } = useFetchCourses();
  const terms = useLocalization(localization);
  const crumbs = [
    { label: terms.testimonials },
  ];

  return (
    <JumbotronLayout overflow="auto" icon={<MegaPhone size={13} />} title={terms.testimonials} subTitle={terms.studentOpinions} crumbs={crumbs}>
      {!courses && <Loading variant="huge" />}
      {courses && <Courses courses={courses} />}
    </JumbotronLayout>
  );
};
