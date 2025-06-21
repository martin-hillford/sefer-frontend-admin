import { Testimony } from 'types/data/enrollments/Testimony';
import { isEmpty } from 'util/validation';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export type Validation = {
    name : null | string;
    content : null | string;
}

export const useValidateTestimony = () => {
  const terms = useLocalization(localization);
  return (testimony: Testimony, setError: (error: Validation) => void) => {
    const result = { name: null, content: null } as Validation;
    if (!testimony.isAnonymous && isEmpty(testimony.name)) result.name = terms.provideName;
    if (isEmpty(testimony.content)) result.content = terms.provideTestimony;

    setError(result);
    return result.name === null && result.content === null;
  };
}
