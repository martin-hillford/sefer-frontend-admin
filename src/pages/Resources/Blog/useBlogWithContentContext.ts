import { useState } from 'react';
import { DataContext } from 'sefer/types/DataContext';
import { Validator } from 'sefer/util/validator';
import { BlogWithContent } from 'types/data/resources/BlogWithContent';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const useBlogWithContentContext = (blog : BlogWithContent) => {
  const createContext = useCreateContext();
  const [value, setBlock] = useState(createContext(blog));
  value.setListener(setBlock);
  return value;
};

const useCreateContext = () => {
  const terms = useLocalization(localization);
  const isUniqueName = useIsNameUnique();
  const isUniquePermalink = useIsPermalinkUnique();

  return (blog : BlogWithContent) => {
    const context = new DataContext<BlogWithContent>(blog);

    const validator = new Validator();

    validator
      .string('content')
      .minLength(3, terms.contentValidation)
      .required(terms.contentValidation);

    validator
      .string('name')
      .minLength(3, terms.nameValidation)
      .required(terms.nameValidation)
      .custom(isUniqueName, terms.uniqueNameValidation);

    validator
      .string('permalink')
      .minLength(3, terms.permalinkValidation)
      .required(terms.permalinkValidation)
      .pattern(/^[a-z0-9-]+$/, terms.permalinkPatternValidation)
      .custom(isUniquePermalink, terms.uniquePermalinkValidation);

    context.setValidator(validator);
    return context;
  }
};

const useIsPermalinkUnique = () => {
  const post = usePost<{response: boolean}>();
  return async (blog : { id: number, permalink: string}) => {
    const { code, body } = await post('/admin/content/blogs/permalink', blog);
    if (code === 200) return body?.response === true;
    throw new ResponseError(code, 'Error while retrieving the uniqueness of the permalink of the blog .');
  };
}
const useIsNameUnique = () => {
  const post = usePost<{response: boolean}>();
  return async (blog : { id: number, name: string}) => {
    const { code, body } = await post('/admin/content/blogs/name', blog);
    if (code === 200) return body?.response === true;
    throw new ResponseError(code, 'Error while retrieving the uniqueness of the name of the blog .');
  };
}
