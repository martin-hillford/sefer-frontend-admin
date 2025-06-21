import { Bold, Boolean, DateTimeLabel, ErrorText, Line, Property, TextField } from 'sefer/components';
import { TextEditor } from 'components';
import { BlogWithContent } from 'types/data/resources/BlogWithContent';
import { Actions } from './Actions';
import { useSaveBlog } from './useSaveBlog';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const BlogForm = (props : { blog: BlogWithContent }) => {
  const { blog } = props;
  const { context, save } = useSaveBlog(blog);
  const terms = useLocalization(localization);
  const setContent = (value : string) => context.setValue('content', value);

  return (
    <>
      <Property label={terms.author}>{context.data.authorName}</Property>
      <Property label={terms.published}>
        <Boolean size={16} value={context.data.isPublished} />
      </Property>
      <Property label={terms.publicationDate}>
        <DateTimeLabel empty={terms.empty} value={context.data.publicationDate} />
      </Property>
      <Property label={terms.name}>
        <TextField dataContext={context} name="name" />
      </Property>
      <Property label={terms.permalink}>
        <TextField dataContext={context} name="permalink" />
      </Property>
      <Bold>{terms.content}</Bold>
      <TextEditor content={context.data.content} setContent={setContent} />
      <ErrorText>{context.getError('content')}</ErrorText>
      <Line />
      <Actions context={context} onSaveBlog={save} />
    </>
  );
};
