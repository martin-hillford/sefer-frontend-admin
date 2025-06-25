import { IdParam } from 'components';
import { Page } from './Page';

export default () => <IdParam fallback="/users" onId={enrollmentId => <Page enrollmentId={enrollmentId} />} />;
