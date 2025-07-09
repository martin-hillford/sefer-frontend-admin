import { useParams } from 'util/useRouting';
import { Fallback } from '../Fallback';
import { Main } from './Main';

export default () => {
  const params = useParams(parseInt);
  if (Number.isNaN(params.curriculumId)) return <Fallback />;
  return <Main curriculumId={params.curriculumId as number} year={params.year as number | undefined} />;
};
