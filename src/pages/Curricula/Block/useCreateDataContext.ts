import { Block } from 'types/data/curricula/Revision';
import { Validator } from 'sefer/util/validator/Validator';
import { DataContext } from 'sefer/types/DataContext';
import { useFetchIsBlockNameUnique } from './useFetchIsBlockNameUnique';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';

export const useCreateDataContext = () => {
  const isUniqueName = useIsUniqueName();
  const terms = useLocalization(localization);
  return (curriculumId: number, block: Block) => {
    const validator = new Validator();
    validator
      .prop('name')
      .string()
      .minLength(3, terms.blockNameTooShort)
      .maxLength(255, terms.blockNameTooLong)
      .required(terms.blockNameRequired)
      .custom((_: string, value: Block) => isUniqueName(curriculumId, value), terms.blockNameNotUnique);

    const context = new DataContext(block);
    context.setValidator(validator);
    return context;
  };
}

const useIsUniqueName = () => {
  const fetch = useFetchIsBlockNameUnique();
  return async (curriculumId: number, block: Block) => {
    const args = { id: block.id, curriculumId,  name: block.name, year: block.year };
    return fetch(args);
  }
}
