import { BaseLayout, Jumbotron, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { Form } from './Form';
import { useCurriculum } from './useCurriculum';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Main = (props : { curriculum : CurriculumBase | undefined }) => {
  const { curriculum } = props;
  const [context, save] = useCurriculum(curriculum);
  const crumbs = useCrumbs(context?.data);
  const terms = useLocalization(localization);

  return (
    <BaseLayout crumbs={crumbs} title={terms.education} subTitle={terms.subTitle} icon={<Education size={13} />}>
      <Jumbotron>
        {!context && <Loading variant="large" /> }
        {context && <Form context={context} save={save} />}
      </Jumbotron>
    </BaseLayout>
  );
};

const useCrumbs = (curriculum? : CurriculumBase) => {
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.curriculums, link: '/curricula' }] as { label: string, link? : string }[];
  const name = terms.curriculumName.replace('@name', curriculum?.name ?? '');
  if (!curriculum) crumbs.push({ label: terms.loadingCurriculum });
  else if (curriculum.id > 0) crumbs.push({ label: name });
  else crumbs.push({ label: terms.newCurriculum });
  return crumbs;
};
