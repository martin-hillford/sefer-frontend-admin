import { useParams } from 'util/useRouting';
import { Fallback } from '../Fallback';
import { Main } from './Main';

export default () => {
  const params = useParams(parseInt);
  if (Number.isNaN(params.curriculumId) || Number.isNaN(params.blockId)) return <Fallback />;
  return <Main curriculumId={params.curriculumId as number} blockId={params.blockId as number} />;
};
