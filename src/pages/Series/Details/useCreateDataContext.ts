import { Series } from 'types/data/series/Series';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { Validator } from 'sefer/util/validator/Validator';
import { DataContext } from 'sefer/types/DataContext';
import { useFetchIsSeriesNameUnique } from './useFetchIsSeriesNameUnique';

export const useCreateDataContext = () => {
  const terms = useLocalization(localization);
  const isUniqueName = useIsUniqueName();

  return (series: Series) => {
    const validator = new Validator();
    validator
      .prop('name')
      .string()
      .minLength(3, terms.seriesNameMinLength)
      .maxLength(255, terms.seriesNameMaxLength)
      .required(terms.seriesNameRequired)
      .custom(isUniqueName, terms.seriesNameUnique);

    validator
      .prop('description')
      .string()
      .required(terms.seriesDescriptionRequired)
      .minLength(3, terms.seriesDescriptionMinLength);

    const context = new DataContext(series);
    context.setValidator(validator);
    return context;
  }
};

const useIsUniqueName = () => {
  const fetchIsSeriesNameUnique = useFetchIsSeriesNameUnique();
  return async (value: string, series: Series) => {
    return fetchIsSeriesNameUnique(series.id, value);
  }
};
