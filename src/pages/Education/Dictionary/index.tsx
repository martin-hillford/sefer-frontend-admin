import { Navigate, useParams } from 'react-router-dom';
import { useGet } from 'sefer-fetch';
import { CourseDictionary } from 'types/data/CourseDictionary';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { BaseLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { Content } from './Content';

export default () => {
  const { revisionId } = useParams<{ revisionId : string }>();
  if (!revisionId) return <Navigate to="/courses" />;

  const parsed = parseInt(revisionId);
  if (!parsed || Number.isNaN(parsed)) return <Navigate to="/courses" />;

  return <Page revisionId={parsed} />;
};

const Page = (props: { revisionId: number }) => {
  const { revisionId } = props;
  const dictionary = useGet<CourseDictionary>(`/courses/revision/${revisionId}/dictionary`);
  const terms = useLocalization(localization);
  const crumbs = getCrumbs(dictionary);

  return (
    <BaseLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      {!dictionary && <Loading variant="huge" />}
      {dictionary && <Content dictionary={dictionary} />}
    </BaseLayout>
  );
};

const getCrumbs = (dictionary : CourseDictionary | null | undefined) => {
  const terms = useLocalization(localization);
  if (!dictionary) return [];

  const courseLabel = terms.courseName.replace("@name", dictionary.courseName);
  const revLabel = terms.revisionNumber.replace("@number", dictionary.courseRevisionVersion.toString());
  return [
    { label: terms.courses, link: '/courses' },
    { label: courseLabel, link: `/courses/edit/${dictionary.courseId}` },
    { label: revLabel, link: `/courses/revisions/${dictionary.courseId}` },
    { label: terms.dictionary }
  ];
};
