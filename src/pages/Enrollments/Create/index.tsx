import { BaseLayout, Jumbotron, JumbotronLayout, Loading } from 'sefer/components';
import { Pencil } from 'sefer/icons';
import { Form } from './Form';
import { FormProps, useEnrollmentCreation } from './useEnrollmentCreation';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';

export default () => {
  const util = useEnrollmentCreation();
  const { students, mentors, onSave, courses, context } = util;
  const terms = useLocalization(localization);
  const crumbs = useCrumbs();
  const titles = { crumbs, title: terms.enrollments, subTitle: terms.lessonsAndReview };
  if (!students || !courses || !mentors || !context) return <Spinner {...titles} />;
  const props = { students, mentors, onSave, courses, context }
  return <Page {...props} {...titles} />;
}

const Page = (props : FormProps & { title: string, subTitle : string, crumbs: BreadCrumb[]}) => (
  <BaseLayout icon={<Pencil size={13} />} {...props}>
    <Jumbotron>
      <Form {...props} />
    </Jumbotron>
  </BaseLayout>
);

const Spinner = (props : { title: string, subTitle : string , crumbs: BreadCrumb[]}) => (
  <JumbotronLayout icon={<Pencil size={13} />} {...props}>
    <Loading variant="large" center />;
  </JumbotronLayout>
);

const useCrumbs = () => {
  const terms = useLocalization(localization);
  return [
    { label: terms.enrollments, link: '/enrollments' },
    { label: terms.newEnrollment }
  ];
}
