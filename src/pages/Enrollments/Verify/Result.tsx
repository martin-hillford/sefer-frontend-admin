import { Button, ButtonGroup, DateLabel, ErrorText, Header, Loading, Property } from 'sefer/components';
import { useAdminFrontendConfig } from 'hooks/useAdminFrontendConfig';
import { VerificationResult } from 'types/data/enrollments/VerificationResult';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Result = (props : { result? : VerificationResult | undefined | null, type? : string }) => {
  const { result, type } = props;
  const terms = useLocalization(localization);

  if (result === undefined || !type) return null;
  if (result === null) return <LoadingResult header={terms.result} />;

  return (
    <>
      <Header variant="large">{terms.result}</Header>
      <p>
        {result.code === 404 && <ErrorText>{terms.codeNotVerified}</ErrorText> }
        {result.code === 400 && <ErrorText>{terms.codeInvalidFormat}</ErrorText> }
        {result.code === 200 && <View result={result} type={type} /> }
      </p>
    </>
  );
};

const LoadingResult = (props: { header: string }) => (
  <>
    <Header variant="large">{props.header}</Header>
    <Loading variant="medium" />
  </>
);

const View = (props : { result : VerificationResult, type : string }) => {
  const { result, type } = props;
  const config = useAdminFrontendConfig();
  const terms = useLocalization(localization);
  return (
    <>
      <Property label={terms.type}>{type}</Property>
      <Property label={terms.course}>{result.details.course.name}</Property>
      <Property label={terms.student}>{result.details.student.name}</Property>
      <Property label={terms.date}><DateLabel value={result.details.closureDate} /></Property>
      <ButtonGroup $pull="right">
        <Button href={`${config?.api}${result.details.diplomaUrl}`} variant="primary">
          {type}
        </Button>
      </ButtonGroup>
    </>
  );
};
