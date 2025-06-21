import { LessonSummary } from './LessonSummary';
import { RevisionSummary } from '../../../types/data/RevisionSummary';

export const Content = (props : { revision : RevisionSummary}) => {
  const { revision } = props;
  return (
    <>
      {revision.lessons.map(l => <LessonSummary key={l.id} lesson={l} />)}
    </>
  );
};
