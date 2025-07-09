import { Alert, Button, Loading } from 'sefer/components';
import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { Lesson } from 'types/data/Lesson';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { usePostAudio } from './usePostAudio';

export const UploadButton = (props: { context: DataContext<Lesson> }) => {
  const { context } = props;
  const field = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const terms = useLocalization(localization);
  const postAudio = usePostAudio();

  const onFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (!files || files.length !== 1) return;

    setIsUploading(true);
    setUploadFailed(false);
    try {
      const result = await postAudio(files[0], context.data.id)
      context.setValue('audioReferenceId', result.audioReferenceId);
    } catch { setUploadFailed(true); }
    setIsUploading(false);
  };

  const onFileUploadClick = () => {
    if (field.current) field.current.click();
  };

  return (
    <>
      <Input ref={field} accept=".zip" type="file" onChange={onFileSelected} />
      <Button show={!isUploading} onClick={onFileUploadClick} variant="primary" label={terms.upload} />
      <Button show={isUploading} variant="primary" icon={<Loading variant="small" />} />
      <UploadFailed show={uploadFailed} content={terms.audioUploadFailed} onClosed={() => setUploadFailed(false)} />
    </>
  );
};

const Input = styled.input`
    display: none;
`;

const UploadFailed = (props: { onClosed: () => void, show: boolean, content: string }) => {
  const { onClosed, content, show } = props;
  if(!show) return null;
  return (
    <Alert overlay closable onClosed={onClosed} variant="danger">
      {content}
    </Alert>
  );
};
