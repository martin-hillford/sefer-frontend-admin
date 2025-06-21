import { IdParam } from 'sefer/components';
import { Main } from './Main';

export default () => (
  <IdParam
    onId={id => <Main seriesId={id} />}
    fallback="/series"
  />
);
