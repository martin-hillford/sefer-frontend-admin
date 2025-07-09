import { Level } from 'types/data/Level';
import { Stage } from 'types/data/Stages';
import { Main } from './Main';

export default () => {
  const curriculum = { id: -1, isEditable: true, stage: Stage.Edit, name: '', level: Level.Novice };
  return <Main curriculum={curriculum} />;
};
