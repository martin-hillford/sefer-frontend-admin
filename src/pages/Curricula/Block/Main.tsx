import { JumbotronLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { Block, CurriculumWithRevisions } from 'types/data/curricula/Revision';
import { DataContext } from 'sefer/types/DataContext';
import { Content } from './Content';
import { useBlock } from './useBlock';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Main = (props: { curriculumId: number, blockId?: number, year?: number }) => {
  const { curriculumId, blockId, year } = props;
  const { curriculum, block, loaded, courses, save } = useBlock(curriculumId, blockId, year);
  const terms = useLocalization(localization);
  const crumbs = useCrumbs(curriculum, block?.data);

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.education} subTitle={terms.subTitle} crumbs={crumbs}>
      {!loaded && <Loading variant="large" /> }
      <Content
        show={loaded && !!courses}
        curriculum={curriculum!}
        block={block as DataContext<Block>}
        courses={courses!}
        loaded={loaded}
        year={year ?? block?.data.year}
        save={save}
      />
    </JumbotronLayout>
  );
};

const useCrumbs = (curriculum : CurriculumWithRevisions  | undefined | null, block? : Block) => {
  const terms = useLocalization(localization);
  const crumbs = [{ label: 'Curriculums', link: '/curricula' }] as { label: string, link? : string }[];

  if (!curriculum || !block) { crumbs.push({ label: terms.curriculumIsLoading }); return crumbs; }

  // Deal with the revision and the labels
  const revision = curriculum.editingRevision;
  const curriculumName = terms.curriculum.replace('@name', curriculum.name);
  const revisionLabel = terms.revision.replace('@rev', ` ${revision?.version}`);

  crumbs.push({ label: curriculumName, link: `/curricula?id=${curriculum.id}` });
  crumbs.push({ label: revisionLabel, link: `/curricula/revisions/${curriculum.id}` });

  if (revision?.useYears) {
    const yearLabel = terms.year.replace('@year', ` ${block?.year}`);
    crumbs.push({ label: yearLabel, link: `/curricula/revisions/${curriculum.id}/years/${block.year}` });
  }

  if (block.id === -1) crumbs.push({ label: terms.blockNew });
  else crumbs.push({ label: terms.block.replace('@name', block.name) });

  return crumbs;
};
