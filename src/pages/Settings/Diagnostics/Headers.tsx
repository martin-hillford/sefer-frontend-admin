import { Header, KeyValueTable } from 'sefer/components';
import { HttpHeader } from 'types/data/settings/HttpHeader';

export const Headers = (props : { content: string, headers : HttpHeader[] }) => (
  <>
    <Header inline variant="large">{props.content}</Header>
    <KeyValueTable data={props.headers} />
  </>
);
