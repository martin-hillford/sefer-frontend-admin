import { Configuration } from 'types/data/settings/Configuration';
import { DataContext } from 'sefer/types/DataContext';
import { Validator } from 'sefer/util/validator/Validator';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useEffect, useState } from 'react';

export const useDataContext = (settings: Configuration | null | undefined) => {
  const dataContext = useCreateDataContext(settings);
  const [ context, setContext ] = useState<DataContext<Configuration> | undefined | null>(dataContext);

  useEffect(() => {
      if(!settings) setContext(settings);
      else setContext(dataContext);
  }, [ settings ]);


  if(context) context.setListener(setContext);
  return context;
}


export const useCreateDataContext = (settings : Configuration | null | undefined) => {
  const terms = useLocalization(localization);
  if(!settings) return settings;

  const context = new DataContext<Configuration>(settings);
  const validator = new Validator();

  validator
    .prop('studentActiveDays')
    .number()
    .required(terms.studentReminderDaysRequired)
    .range(1, 120, terms.studentActiveDaysRange);

  validator
    .prop('studentReminderDays')
    .number()
    .required(terms.studentReminderDaysRequired)
    .range(1, 365, terms.studentReminderDaysRange);

  validator
    .prop('sameMentorDays')
    .number()
    .required(terms.sameMentorDaysRequired)
    .range(1, 365, terms.sameMentorDaysRange);

  validator
    .prop('maxLessonSubmissionsPerDay')
    .number()
    .required(terms.maxLessonSubmissionsPerDayRequired)
    .min(0, terms.maxLessonSubmissionsPerDayMin);

  validator
    .prop('optimalAgeDifference')
    .number()
    .required(terms.optimalAgeDifferenceRequired)
    .range(0, 255, terms.optimalAgeDifferenceRange);

  validator
    .prop('relativeAvailabilityFactor')
    .number()
    .required(terms.relativeAvailabilityFactorRequired)
    .range(0, 100, terms.relativeAvailabilityFactorRange);

  validator
    .prop('isLessonSubmissionsLimited')
    .bool()
    .required();

  context.setValidator(validator);

  return context;
};
