import { Navigate, useParams } from 'react-router-dom';
import { Education } from 'sefer/icons';
import { BaseLayout, Loading } from 'sefer/components';
import { Content } from './Content';
import { RevisionSummary } from 'types/data/RevisionSummary';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useFetchQuestions } from './useFetchQuestions';

export default () => {
  const { revisionId } = useParams<{ revisionId : string }>();
  if (!revisionId) return <Navigate to="/courses" />;

  const parsed = parseInt(revisionId);
  if (!parsed || Number.isNaN(parsed)) return <Navigate to="/courses" />;

  return <Summary revisionId={parsed} />;
};

const Summary = (props : { revisionId : number}) => {
  const { revisionId } = props;
  const revision = useFetchQuestions(revisionId);
  const terms = useLocalization(localization);
  const crumbs = useCrumbs(revision);

  return (
    <BaseLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      {!revision && <Loading variant="huge" />}
      {revision && <Content revision={revision} />}
    </BaseLayout>
  );
};

const useCrumbs = (revision : RevisionSummary | undefined) => {
  const terms = useLocalization(localization);
  if (!revision) return [];
  const courseLabel = terms.courseName.replace("@name", revision.course.name);
  const revLabel = terms.revisionNumber.replace("@number", revision.version?.toString() ?? '');
  return [
    { label: terms.courses, link: '/courses' },
    { label: courseLabel, link: `/courses/edit/${revision.courseId}` },
    { label: revLabel, link: `/courses/revisions/${revision.courseId}` },
    { label: terms.questionsOverview }
  ];
};
