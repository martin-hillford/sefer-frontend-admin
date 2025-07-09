import { useAdminFrontendConfig } from 'hooks/useAdminFrontendConfig';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { Level, Loading, Property, Stage } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Curriculum = ({ curriculum } : { curriculum : CurriculumBase | undefined}) => {
  const config = useAdminFrontendConfig();
  const terms = useLocalization(localization);
  
  if (!curriculum) return <Loading center />;
  return (
    <>
      <Property label={terms.status}>
        <Stage stage={curriculum.stage} withTooltip />
      </Property>
      <Property label={terms.name}>{curriculum.name}</Property>
      <Property label={terms.permalink}>
        <a target="_blank" rel="noreferrer" href={`${config?.publicSite}/curricula/${curriculum.permalink}`}>{curriculum.permalink}</a>
      </Property>
      <Property label={terms.level}>
        <Level value={curriculum.level as string} />
      </Property>
      <Property label={terms.description}>{curriculum.description}</Property>
    </>
  );
};
