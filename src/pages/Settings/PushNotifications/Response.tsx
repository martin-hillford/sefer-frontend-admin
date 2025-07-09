import { Boolean, Button, ButtonGroup, Header, Line, Property } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  back: () => void,
  response: { success: boolean, error?: string, exception?: object }
}

export const Response = (props: Props) => {
  const { response, back } = props;
  const { success, exception, error } = response;
  const terms = useLocalization(localization);

  return (
    <div style={{ flex: '1 1 auto' }}>
      <Header variant="large">{terms.result}</Header>
      <Property label={terms.success}><Boolean size={16} colored value={success} /></Property>
      {error && <Property label={terms.errorMessage}>{error}</Property>}
      {exception && <Property label={terms.exception}>{JSON.stringify(exception)}</Property>}
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={() => back()} label={terms.back} />
      </ButtonGroup>
    </div>

  );
};
