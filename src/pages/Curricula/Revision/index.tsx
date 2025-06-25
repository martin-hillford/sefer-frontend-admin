import { JumbotronLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { IdParam } from 'components';
import { CurriculumWithRevisions } from 'types/data/curricula/Revision';
import { useCurriculumWithRevision } from './useCurriculumWithRevision';
import { Properties } from './Properties';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';

export default () => <IdParam fallback="/curricula" onId={id => <Main id={id} />} />;

const Main = (props : { id : number}) => {
  const { id } = props;
  const { curriculum, save } = useCurriculumWithRevision(id);
  const crumbs = useCrumbs(curriculum);
  const terms = useLocalization(localization);

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.education} subTitle={terms.subTitle} crumbs={crumbs}>
      { !curriculum && <Loading variant="large" /> }
      { curriculum && <Properties curriculum={curriculum} save={save} /> }
    </JumbotronLayout>
  );
};

const useCrumbs = (curriculum: CurriculumWithRevisions | null | undefined) => {
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.curriculums, link: '/curricula' }] as { label: string, link? : string }[];
  if (!curriculum) crumbs.push({ label: terms.curriculumLoading });
  else {
    const revision = terms.revisionName.replace("@version", `${curriculum.editingRevision.version}`);
    crumbs.push({ label: terms.curriculumName.replace("@name", curriculum.name) });
    crumbs.push({ label: revision  });
  }
  return crumbs;
};
