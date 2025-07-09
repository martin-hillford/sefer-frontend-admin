import { useState } from 'react';
import { Lesson } from 'types/data/Lesson';
import { DataContext } from 'sefer/types/DataContext';
import { Validator } from 'sefer/util/validator/Validator';

export const useLessonDataContext = (lesson : Lesson) => {
  const initial = useCreateDataContext(lesson);
  const [value, setLesson] = useState(initial);
  value.setListener(setLesson);
  return value;
};

const useCreateDataContext = (lesson : Lesson) => {
  const context = new DataContext(lesson);
  const validator = new Validator();

  validator
    .prop('name')
    .string()
    .required('Geef de naam van de les op')
    .minLength(3, 'De naam van een les dient tenminste 3 tekens lang te zijn.')
    .maxLength(50, 'De naam van een les mag maximaal 50 tekens lang zijn.');

  validator
    .prop('number')
    .string()
    .required('Geef het nummer van de les op.')
    .minLength(1, 'Het nummer van een les dient tenminste 1 teken lang te zijn.')
    .maxLength(50, 'Het nummer van een les mag maximaal 50 tekens lang zijn.');

  context.setValidator(validator);
  return context;
};
