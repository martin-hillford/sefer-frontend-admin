import { Education } from 'sefer/icons';
import { Navigate, useParams } from 'react-router-dom';
import { SurveySettings } from 'types/data/SurveySettings';
import { BaseLayout, Loading } from 'sefer/components';
import { Content } from './Content';
import { useFetchSurveyRevision } from './useFetchSurveyRevision';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const { revisionId } = useParams<{ revisionId : string }>();
  if (!revisionId) return <Navigate to="/courses" />;

  const parsed = parseInt(revisionId);
  if (!parsed || Number.isNaN(parsed)) return <Navigate to="/courses" />;

  return <Page revisionId={parsed} />;
};

const Page = (props : {revisionId : number}) => {
  const { revisionId } = props;
  const survey = useFetchSurveyRevision(revisionId);
  const terms = useLocalization(localization);
  const crumbs = getCrumbs(survey);

  return (
    <BaseLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      {!survey && <Loading variant="huge" />}
      {survey && <Content settings={survey} /> }
    </BaseLayout>
  );
};

const getCrumbs = (settings : SurveySettings | undefined) => {
  const terms = useLocalization(localization);
  if (!settings) return [];

  const courseLabel = terms.courseName.replace("@name", settings.courseName);
  const revLabel = terms.revisionNumber.replace("@number", settings.courseRevisionVersion.toString());
  return [
    { label: terms.courses, link: '/courses' },
    { label: courseLabel, link: `/courses/edit/${settings.courseId}` },
    { label: revLabel, link: `/courses/revisions/${settings.courseId}` },
    { label: terms.survey }
  ];
};

