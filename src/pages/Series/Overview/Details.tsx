import { Series } from 'types/data/series/Series';
import { Boolean, Level, Loading, Property } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Details = ({ series } : { series : Series | undefined}) => {
  const terms = useLocalization(localization);
  if (!series) return <Loading center />;
  return (
    <>
      <Property label={terms.name}>{series.name}</Property>
      <Property label={terms.level}>
        <Level value={series.level as string} />
      </Property>
      <Property label={terms.description}>{series.description}</Property>
      <Property label={terms.published}>
        <Boolean value={series.isPublic} size={24} />
      </Property>
    </>
  );
};
