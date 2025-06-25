import { IdParam } from 'components';
import { Main } from './Main';
import { useFetchCurriculum } from './useFetchCurriculum';

export default () => <IdParam fallback="/curricula" onId={id => <Loader id={id} />} />;

const Loader = (props : { id : number}) => {
  const { id } = props;
  const curriculum = useFetchCurriculum(id);
  return <Main curriculum={curriculum} />;
};
