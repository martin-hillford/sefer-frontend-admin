import { useState } from 'react';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { Validator } from 'sefer/util/validator';
import { DataContext } from 'sefer/types/DataContext';
import { isDefined } from '../../../util/validation';
import { Enrollment } from './useEnrollmentCreation';

export const useEnrollmentContext = (enrollment: Enrollment) => {
  const createContext = useCreateContext();
  const [value, setBlock] = useState(createContext(enrollment));
  value.setListener(setBlock);
  return value;
};

const useCreateContext = () => {
  const terms = useLocalization(localization)
  return (enrollment: Enrollment) => {
    const validator = new Validator();

    validator.number('studentId').required();
    validator.number('mentorId').required();
    validator.number('courseId').required();

    validator
      .number('grade')
      .custom(grade, terms.gradeValidation);

    validator
      .number('completionDate')
      .custom(completionDate, terms.completionDateValidation);

    const context = new DataContext<Enrollment>(enrollment);
    context.setValidator(validator);
    return context;
  };
}

const grade = async (value : number | undefined | null, enrollment : Enrollment) => {
  if (!enrollment.isCompleted) return true;
  if (!isDefined(value)) return false;
  return value >= 0 && value <= 10;
};

const completionDate = async (value : unknown, enrollment : Enrollment) => {
  if (!enrollment.isCompleted) return true;
  return isDefined(value);
};
