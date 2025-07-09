import { JumbotronLayout, Loading } from 'sefer/components';
import { IdParam } from 'components';
import { Education } from 'sefer/icons';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { Content } from './Content';
import { useCurriculum } from './useCurriculum';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => <IdParam fallback="/curricula" onId={id => <Main id={id} />} />;

const Main = (props : { id : number}) => {
  const { id } = props;
  const state = useCurriculum(id);
  const terms = useLocalization(localization);
  const crumbs = useCrumbs(state.curriculum);

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.education} subTitle={terms.educationSubTitle} crumbs={crumbs}>
      {!state.curriculum && <Loading variant="large" /> }
      {state.curriculum && <Content {...state} curriculum={state.curriculum} /> }
    </JumbotronLayout>
  );
};

const useCrumbs = (curriculum : CurriculumBase | null | undefined) => {
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.curriculums, link: '/curricula' }] as { label: string, link? : string }[];
  if (!curriculum) crumbs.push({ label: terms.curriculumLoading });
  else crumbs.push({ label: terms.curriculumName.replace("@name",curriculum.name) });
  return crumbs;
};
