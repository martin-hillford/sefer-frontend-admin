import { JumbotronLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { useParams } from 'react-router-dom';
import { CurriculumWithRevisions } from 'types/data/curricula/Revision';
import { Fallback } from '../Fallback';
import { Blocks } from './Blocks';
import { useYears } from './useYears';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const params = useParams<{ curriculumId : string, year : string }>();

  if (!params.curriculumId || !params.year) return <Fallback />;

  const curriculumId = parseInt(params.curriculumId);
  const year = parseInt(params.year);
  if (Number.isNaN(curriculumId) || Number.isNaN(year)) return <Fallback />;

  return <Main curriculumId={curriculumId} year={year} />;
};

const Main = (props : { curriculumId : number, year : number }) => {
  const { curriculumId, year } = props;
  const { curriculum, blocks, deleteBlock, refresh, sorted, setBlocks } = useYears(curriculumId, year);
  const crumbs = useCrumbs(curriculum, year);
  const terms = useLocalization(localization);

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.education} subTitle={terms.subTitle} crumbs={crumbs}>
      { !curriculum && <Loading variant="large" /> }
      <Blocks
        blocks={blocks}
        curriculum={curriculum}
        year={year}
        deleteBlock={deleteBlock}
        refresh={refresh}
        sorted={sorted}
      setBlocks={setBlocks}
    />
    </JumbotronLayout>
  );
};

const useCrumbs = (curriculum : CurriculumWithRevisions | undefined | null, year: number) => {
  const terms = useLocalization(localization);

  const crumbs = [{ label: terms.curriculumLoading, link: '/curricula' }] as { label: string, link? : string }[];
  if (!curriculum) crumbs.push({ label: 'Curriculum wordt geladen' });
  else {
    const curriculumName = terms.curriculum.replace("@name", curriculum.name);
    const revision = terms.revision.replace("@version", `${curriculum.editingRevision.version}`);

    crumbs.push({ label: curriculumName, link: `/curricula?id=${curriculum.id}` });
    crumbs.push({ label: revision, link: `/curricula/revisions/${curriculum.id}` });
    crumbs.push({ label: terms.year.replace("@number", `${year}`) });
  }

  return crumbs;
};
