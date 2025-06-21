import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { Validator } from 'sefer/util/validator/Validator';
import { DataContext } from 'sefer/types/DataContext';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { useFetchIsCurriculaNameUnique } from './useFetchIsCurriculaNameUnique';
import { useFetchIsCurriculaPermalinkUnique } from './useFetchIsCurriculaPermalinkUnique';

export const useCreateDataContext = () => {
  const terms = useLocalization(localization);
  const isUniqueName = useIsUniqueName();
  const isUniquePermalink = useIsUniquePermalink();

  return (curriculum: CurriculumBase) => {
    const validator = new Validator();

    validator
      .prop('name')
      .string()
      .required(terms.curriculumNameRequired)
      .minLength(3, terms.curriculumNameMinLength)
      .maxLength(255, terms.curriculumNameMaxLength)
      .custom(isUniqueName, terms.curriculumNameUnique);

    validator
      .prop('permalink')
      .string()
      .required(terms.permalinkRequired)
      .minLength(3, terms.permalinkMinLength)
      .maxLength(255, terms.permalinkMaxLength)
      .pattern(/^[a-z0-9-]+$/, terms.permalinkPattern)
      .custom(isUniquePermalink, terms.permalinkUnique);

    validator
      .prop('description')
      .string()
      .required(terms.descriptionRequired);

    const context = new DataContext(curriculum);
    context.setValidator(validator);
    return context;
  }
};

const useIsUniqueName = () => {
  const fetchIsCurriculaNameUnique = useFetchIsCurriculaNameUnique();
  return async (value: string, series: CurriculumBase) => {
    return fetchIsCurriculaNameUnique(series.id, value);
  }
};

const useIsUniquePermalink = () => {
  const fetchIsCurriculaPermalinkUnique = useFetchIsCurriculaPermalinkUnique();
  return async (value: string, series: CurriculumBase) => {
    return fetchIsCurriculaPermalinkUnique(series.id, value);
  }
};
