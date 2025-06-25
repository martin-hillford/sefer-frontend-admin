import { IdParam } from 'components';
import { Page } from './Page';

export default () => <IdParam fallback="/users" onId={userId => <Page userId={userId} />} />;
