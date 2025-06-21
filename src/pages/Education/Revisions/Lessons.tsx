import { Button, ButtonGroup, Header, List } from 'sefer/components';
import { Edit, ListOrdered, MenuHamburger, Minus, Plus } from 'sefer/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CourseContentState } from 'types/data/CourseContentState';
import { CourseWithRevisions } from 'types/data/CourseWithRevisions';
import { NamedEntity } from 'types/data/Entity';
import { LessonBase } from 'types/data/LessonBase';
import { DeleteLessonDialog } from './DeleteLessonDialog';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { renderLesson } from './renderLesson';
import { usePostLessonSequence } from './usePostLessonSequence';
import { useDeleteLesson } from './useDeleteLesson';

export const Lessons = (props : { course : CourseWithRevisions, courseId : number, contentState? : CourseContentState | null }) => {
  const { course, courseId, contentState } = props;
  const terms = useLocalization(localization);
  const navigate = useNavigate();
  const postLessonSequence = usePostLessonSequence();
  const deleteLesson = useDeleteLesson();

  const [lessons, setLesson] = useState(course.editingRevision.lessons);
  const [selected, setSelected] = useState<NamedEntity>();
  const [sorting, setSorting] = useState(false);
  const [state, setState] = useState('edit');

  const onAddLesson = () => navigate(`/courses/lesson/new/${courseId}`);
  const showQuestions = () => navigate(`/courses/questions/${course.editingRevision.id}`);

  useEffect(() => {
    setLesson(course.editingRevision.lessons);
  }, [course]);

  const onEdit = () => {
    if (!selected) return;
    navigate(`/courses/lesson/${selected.id}`);
  };

  const onSortingClick = async () => {
    const toSave = sorting;
    setSorting(!sorting);
    if (!toSave) return;
    await postLessonSequence(course.editingRevision.id, lessons.map(i => i.id));
  };

  const removeLesson = async () => {
    setState('edit');
    await deleteLesson(selected?.id);
    setLesson(lessons.filter(l => l.id !== selected?.id));
    setSelected(undefined);
  };

  return (
    <>
      <DeleteLessonDialog show={state === 'remove'} onConfirmed={removeLesson} onCanceled={() => setState('edit')} />
      <Header variant="large">{terms.lessons}</Header>
      <Panel>
        <List
          onSelect={setSelected}
          sorting={sorting}
          items={lessons}
          onSorted={items => setLesson(items as LessonBase[])}
          getLabel={entity => entity.name}
          onRenderItemContent={item => renderLesson(item,contentState)}
        />
      </Panel>
      <ButtonBar>
        <ButtonGroup $pull="left">
          <Button onClick={showQuestions}><ListOrdered size={20} /></Button>
        </ButtonGroup>

        <ButtonGroup $pull="right">
          <Button onClick={onAddLesson}><Plus size={20} /></Button>
          <Button onClick={onEdit} disabled={!selected}><Edit size={20} /></Button>
          <Button onClick={onSortingClick} variant={sorting ? 'selected' : 'default'}>
            <MenuHamburger size={20} />
          </Button>
          <Button
            onClick={() => setState('remove')}
            icon={<Minus size={20} />}
            disabled={!selected}
            variant="danger"
          />
        </ButtonGroup>
      </ButtonBar>
    </>
  );
};

const ButtonBar = styled.div`
    display: flex;
    div { flex-grow: 1; flex-shrink: 1; }
`;


const Panel = styled.div`
    @media (min-width: 1024px) { height: calc(100vh - 285px); }
    padding-bottom: 15px;
`;
