import { useState } from 'react';
import { ContentBlock } from 'types/data/ContentBlock';
import { DataContext } from 'sefer/types/DataContext';
import { Validator } from 'sefer/util/validator/Validator';
import { Choice } from 'types/data/Choice';
import { ContentBlockType } from 'types/data/ContentBlockType';
import { getVimeoVideoId, getYouTubeId } from '@martin-hillford/markdown-ts-react';
import { isEmpty } from 'sefer/util/isEmpty';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const useContentBlockDataContext = (block : ContentBlock) => {
  const initial = useCreateDataContext(block);
  const [value, setBlock] = useState(initial);
  value.setListener(setBlock);
  return value;
}

const useCreateDataContext = (block : ContentBlock) => {
  const terms = useLocalization(localization).blockValidation
  const context = new DataContext<ContentBlock>(block);

  const validator = new Validator();

  validator
    .prop('url')
    .string()
    .custom(url, terms.url)
    .custom(youtube, terms.youtube)
    .custom(vimeo, terms.vimeo);

  validator
    .prop('content')
    .string()
    .custom(text, terms.text)
    .custom(question, terms.question);

  validator
    .prop('choices')
    .array()
    .custom(choices, terms.choices)
    .custom(min, terms.min)
    .custom(multi, terms.multi);

  context.setValidator(validator);
  return context;
};

const multi = async (value : Choice[] | undefined, block: ContentBlock) => {
  if (block.type !== ContentBlockType.QuestionMultipleChoice) return true;
  if (block.isMultiSelect) return true;
  if (!value) return false;
  const correct = value.filter(c => c.isCorrectAnswer);
  return correct.length < 2;
};

const youtube = async (value : string | undefined, block: ContentBlock) => {
  if (block.type !== ContentBlockType.ElementYoutube) return true;
  if (!value) return false;
  const youtubeId = getYouTubeId(value);
  return youtubeId !== undefined;
};

const vimeo = async (value : string | undefined, block: ContentBlock) => {
  if (block.type !== ContentBlockType.ElementVimeo) return true;
  if (!value) return false;
  const vimeoId = getVimeoVideoId(value);
  return vimeoId !== undefined;
};

const url = async (value : string | undefined, block: ContentBlock) => {
  switch (block.type) {
    case ContentBlockType.ElementText:
    case ContentBlockType.QuestionBoolean:
    case ContentBlockType.QuestionOpen:
    case ContentBlockType.QuestionMultipleChoice:
    case ContentBlockType.ElementYoutube:
      return true;
    default:
      return !!value && value.startsWith('https://');
  }
};

const text = async (value : string | undefined, block: ContentBlock) => {
  if (block.type !== ContentBlockType.ElementText) return true;
  return !!value && value.trim().length > 0;
};

const question = async (value : string | undefined, block: ContentBlock) => {
  switch (block.type) {
    case ContentBlockType.QuestionBoolean:
    case ContentBlockType.QuestionOpen:
    case ContentBlockType.QuestionMultipleChoice:
      return !!value && value.trim().length > 0;
    default:
      return true;
  }
};

const choices = async (value : Choice[] | undefined, block: ContentBlock) => {
  if (block.type !== ContentBlockType.QuestionMultipleChoice) return true;
  if (!value) return false;
  const empty = value.filter(c => isEmpty(c.answer));
  return empty.length === 0;
};

const min = async (value : Choice[] | undefined, block: ContentBlock) => {
  if (block.type !== ContentBlockType.QuestionMultipleChoice) return true;
  return !value || value.length > 1;
};
