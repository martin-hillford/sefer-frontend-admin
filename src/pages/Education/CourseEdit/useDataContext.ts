import { DataContext } from 'sefer/types/DataContext';
import { Validator } from 'sefer/util/validator/Validator';
import { Course } from 'types/data/Course';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useIsCoursePermalinkUnique } from './useIsCoursePermalinkUnique';
import { useIsCourseNameUnique } from './useIsCourseNameUnique';
import { useState } from 'react';

export const useDataContext = (course: Course) => {
  const dataContext = useCreateDataContext(course);
  return useState(dataContext);
}

const useCreateDataContext = (course: Course) => {
  const context = new DataContext<Course>(course);
  const terms = useLocalization(localization);
  const validator = new Validator();
  const isUniquePermalink = useIsCoursePermalinkUnique();
  const isUniqueName = useIsCourseNameUnique();

  validator
    .prop('name')
    .string()
    .maxLength(255, terms.nameMaxLength)
    .minLength(3, terms.nameMinLength)
    .required(terms.nameRequired)
    .custom(isUniqueName, terms.nameIsUniqueName);

  validator
    .prop('permalink')
    .string()
    .required(terms.permalinkRequired)
    .pattern(/^[a-z0-9-]+$/, terms.permalinkPattern)
    .custom(isUniquePermalink, terms.permalinkIsUniquePermalink);

  validator
    .prop('description')
    .string()
    .required(terms.descriptionRequired);

  validator
    .prop('author')
    .string()
    .maxLength(255, terms.authorMaxLength);

  validator
    .prop('copyright')
    .string()
    .maxLength(255, terms.copyrightMaxLength);

  validator
    .prop('copyrightLogo')
    .string()
    .maxLength(255, terms.copyrightLogoMaxLength);

  context.setValidator(validator);
  return context;
};
