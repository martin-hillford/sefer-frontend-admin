import { useState } from 'react';
import { DataContext } from 'sefer/types/DataContext';
import { Validator } from 'sefer/util/validator/Validator';
import { isEmpty } from 'util/validation';

export type Testimony = {
    id : number;
    courseId? : number | null;
    studentId? : number | null;
    content : string;
    name : string;
    isAnonymous : boolean;
    creationDate : Date;
    modificationDate? : Date | null;
}

export const useTestimonyContext = (testimony : Testimony) => {
  const [value, setBlock] = useState(getContext(testimony));
  value.setListener(setBlock);
  return value;
};

const getContext = (testimony : Testimony) => {
  const context = new DataContext<Testimony>(testimony);

  const validator = new Validator();

  validator
    .string('content')
    .minLength(5, 'Geef de inhoud van het getuigenis op.')
    .required('Geef de inhoud van de getuigenis op.');

  validator
    .string('name')
    .custom(name, 'Geef de naam van de persoon die getuigd op.');

  context.setValidator(validator);

  return context;
};

const name = async (_: string, testimony : Testimony) => {
  if (testimony.isAnonymous) return true;
  return !isEmpty(testimony.name) && testimony.name.length > 1;
};
