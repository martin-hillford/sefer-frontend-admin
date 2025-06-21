import { LessonBase } from 'types/data/LessonBase';
import { CourseContentState } from 'types/data/CourseContentState';
import { ContentStateIndicator } from 'sefer/components/ContentState/ContentState';
import { ContentState } from 'types/data/ContentState';
import styled from 'styled-components';

export const renderLesson = (item : LessonBase, contentState?: CourseContentState | null | undefined) => {
  const updateState = getState(item, contentState);
  return <Item><div className="indicator"><ContentStateIndicator state={updateState} /></div>{item.name}</Item>;
};

const getState = (item: LessonBase, contentState : CourseContentState | undefined | null) => {
  if (!contentState) return null;
  if (!contentState.lessons) return ContentState.Html;
  const filtered = contentState.lessons.find(l => l.lessonId === item.id);
  return filtered?.contentState;
};

const Item = styled.div`
    display: flex;
    div.indicator  {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 10px;
    }
`;
