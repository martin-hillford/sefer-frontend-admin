import { Button, ButtonGroup, Header, Jumbotron, Line } from 'sefer/components';
import { useScrollContext } from 'context/ScrollContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentBlock } from 'types/data/ContentBlock';
import { Lesson } from 'types/data/Lesson';
import { DataContext } from 'sefer/types/DataContext';
import { setWait } from 'util/setWait';
import { Content } from './Content';
import { GeneralSettings } from './GeneralSettings';
import { LessonSaveFailed } from './LessonSaveFailed';
import { LessonSaved } from './LessonSaved';
import { LessonSaving } from './LessonSaving';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useSaveLesson } from './useSaveLesson';

type PanelProps = {
    lessonDataContext : DataContext<Lesson>,
    onEditBlock : (block : ContentBlock) => void
    convertToMarkDown : () => void
}

export const Panel = (props : PanelProps) => {
  const navigate = useNavigate();
  const saveLesson = useSaveLesson();
  const terms = useLocalization(localization);
  const { lessonDataContext, onEditBlock, convertToMarkDown } = props;
  const header = useHeader(lessonDataContext.data);
  const [state, setState] = useState('edit');
  const [sorting, setSorting] = useState(false);
  const scrollContext = useScrollContext();

  const back = () => {
    navigate(`/courses/revisions/${lessonDataContext.data.course.id}`);
  };

  const save = async () => {
    scrollContext?.toTop();
    const valid = await lessonDataContext.validate();
    if (!valid) return;

    const process = async () => {
      setState('saving');
      const result = await saveLesson(lessonDataContext.data);
      if (result) lessonDataContext.set(result);
      return result ? 'saved' : 'failed';
    };
    await setWait(process, setState);
  };

  const onClose = () => { setState('edit'); };

  return (
    <Jumbotron>
      <Header variant="large">{header} </Header>
      <GeneralSettings context={lessonDataContext} />
      <Content
        convertToMarkDown={convertToMarkDown}
        onEditBlock={onEditBlock}
        lessonDataContext={lessonDataContext}
        onSorting={setSorting}
      />
      <Line />
      <ButtonGroup $pull="right">
        <Button disabled={sorting} variant="default" onClick={back}>{terms.cancel}</Button>
        <Button disabled={sorting} variant="primary" onClick={save}>{terms.save}</Button>
      </ButtonGroup>
      { state === 'saving' && <LessonSaving content={terms.saving}  /> }
      { state === 'saved' && <LessonSaved content={terms.saved} onClose={onClose} /> }
      { state === 'failed' && <LessonSaveFailed content={terms.failed} onClose={onClose} /> }
    </Jumbotron>
  );
};

const useHeader = (lesson : Lesson) => {
  const terms = useLocalization(localization)
  if (lesson.id === 0) return terms.newLesson;
  return terms.newLesson.replace("@number", lesson.number).replace("@name", lesson.name);
};
