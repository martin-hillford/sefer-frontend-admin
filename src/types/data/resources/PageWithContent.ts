/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, usePost } from 'sefer-fetch';
import { useState } from 'react';
import { DataContext } from 'sefer/types/DataContext';
import { ResponseError } from 'util/errors';
import { Validator } from 'sefer/util/validator';
import { Page } from './Page';

export type PageWithContent = Page & {
    content : string;
    isHtmlContent : boolean;
    sequenceId : number;
    site?: string | null | undefined
    specificContentId? : number | undefined | null
}

const createContext = (validator: Validator, page : PageWithContent) => {
  const context = new DataContext<PageWithContent>(page);
  context.setValidator(validator);
  return context;
};

export const usePageWithContentContext = (page : PageWithContent) => {
  const validator = useValidator();
  const [context, setContext] = useState(createContext(validator, page));
  context.setListener(setContext);
  return { context };
};

const useValidator = () => {
  const post = usePost();
  const validator = new Validator();

  validator
    .string('content')
    .minLength(3, 'Geef de inhoud van de pagina op.')
    .required('Geef de inhoud van de pagina op.');

  validator
    .string('name')
    .minLength(3, 'Geef de name van de pagina op.')
    .required('Geef de name van de pagina op.')
    .custom((_, item) => isUniqueName(item, post), 'Geef een unieke naam voor deze pagina op.');

  validator
    .string('permalink')
    .minLength(3, 'Geef de permalink van de pagina op.')
    .required('Geef de permalink van de pagina op.')
    .pattern(/^[a-z0-9-]+$/, 'Een permalink mag alleen uit kleine letters, cijfers en een - bestaan.')
    .custom((_, item) => isUniquePermalink(item, post), 'Geef een unieke permalink voor deze pagina op.');

  return validator;
};

const isUniqueName = async (page : { id: number, name: string}, post: (action: string, data: any) => Promise<Response<any>>) => {
  const { code, body } = await post('/admin/content/pages/name', page);
  if (code === 200) return body.response === true;
  throw new ResponseError(code, 'Error while retrieving the uniqueness of the name of the page .');
};

const isUniquePermalink = async (page: any, post: (action: string, data: any) => Promise<Response<any>>) => {
  const { code, body } = await post('/admin/content/pages/permalink', page);
  if (code === 200) return body.response === true;
  throw new ResponseError(code, 'Error while retrieving the uniqueness of the permalink of the page .');
};
