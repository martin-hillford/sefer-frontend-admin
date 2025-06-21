import { Button, ButtonGroup, DropDown, Header, JumbotronLayout, Property, TextField } from 'sefer/components';
import { Pencil } from 'sefer/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { VerificationResult } from 'types/data/enrollments/VerificationResult';
import { Result } from './Result';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useFetchEnrollmentVerify } from './useFetchEnrollmentVerify';

export default () => {
  const terms = useLocalization(localization);
  const crumbs = [ { label: terms.enrollments }, { label: terms.verify }];
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<string>('course');
  const [result, setResult] = useState<VerificationResult | undefined | null>(undefined);
  const fetchEnrollmentVerify = useFetchEnrollmentVerify();

  const types = [
    { label: terms.courseCertificate, value: 'course' },
    { label: terms.curriculumDiploma, value: 'curriculum' },
  ];

  const onVerify = async () => {
    if (!code || code === '') return;
    setResult(null);
    setResult(await fetchEnrollmentVerify(code));
  };

  return (
    <JumbotronLayout overflow="auto" icon={<Pencil size={13} />} title={terms.enrollments} subTitle={terms.subTitle} crumbs={crumbs}>
      <Wrapper>
        <Header variant="large">{terms.verify}</Header>
        <p>{terms.verifyCertificates}</p>
        <Property label={terms.type}>
          <DropDown name="type" label="Type" options={types} onChange={setType} value={type} />
        </Property>
        <TextField name="code" label={terms.code} value={code} onChange={setCode} />
        <ButtonGroup $pull="right">
          <Button onClick={onVerify} variant="primary">{terms.verify}</Button>
        </ButtonGroup>
        <Result result={result} type={types.find(t => t.value === type)?.label} />
      </Wrapper>
    </JumbotronLayout>
  );
};

const Wrapper = styled.div`
    width:100%;
`;
