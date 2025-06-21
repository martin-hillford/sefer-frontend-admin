import { BaseLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { useState } from 'react';
import { ContentBlock } from 'types/data/ContentBlock';
import { Lesson as LessonType } from 'types/data/Lesson';
import { htmlToText } from 'util/html';
import { Editing } from './Editing/Editing';
import { Panel } from './Panel';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useLessonDataContext } from './useLessonDataContext';

export const Lesson = (props : { lesson? : LessonType }) => {
  const { lesson } = props;
  if (!lesson) return <LoadingLayout />;
  return <LessonLayout lesson={lesson} />;
};

const LessonLayout = (props : { lesson : LessonType }) => {
  const { lesson } = props;
  const [edited, setEdited] = useState<ContentBlock>();
  const dataLesson = useLessonDataContext(lesson);
  const terms = useLocalization(localization);

  const onChange = (block : ContentBlock) => {
    const index = dataLesson.data.content.findIndex(b => b.id === block.id);
    if (index === -1) dataLesson.data.content.push(block);
    else dataLesson.data.content[index] = block;
    dataLesson.setValue('content', dataLesson.data.content);
  };

  const convertToMarkDown = () => {
    const blocks = dataLesson.data.content.filter(b => !b.isMarkDownContent);
    blocks.forEach(block => {
      block.content = htmlToText(block.content);
      block.isMarkDownContent = true;
    });
    dataLesson.setValue('content', dataLesson.data.content);
  };

  const onClose = async () => { setEdited(undefined) };
  if (edited) return <Editing block={edited} onChange={onChange} onClose={onClose} />;

  const crumbs = getCrumbs(dataLesson.data);
  return (
    <BaseLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      {!dataLesson && <Loading variant="huge" />}
      {dataLesson && <Panel convertToMarkDown={convertToMarkDown} onEditBlock={(block) => { setEdited(block); }} lessonDataContext={dataLesson} />}
    </BaseLayout>
  );
};

const LoadingLayout = () => {
  const terms = useLocalization(localization);
  return (
    <BaseLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={[]}>
      <Loading variant="huge" />
    </BaseLayout>
  );
}

const getCrumbs = (lesson : LessonType) => {
  const terms = useLocalization(localization);
  const label = lesson.id === -1
    ? terms.newLesson
    : terms.lessonName.replace("@number", lesson.number).replace("@name", lesson.name);

  return [
    { label: terms.courses, link: '/courses' },
    { label: terms.courseName.replace("@name", lesson.course.name), link: `/courses/edit/${lesson.course.id}` },
    { label: terms.revisions, link: `/courses/revisions/${lesson.course.id}` },
    { label }
  ];
};
