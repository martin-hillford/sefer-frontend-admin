import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { Directory } from 'types/data/Directory';
import { Progress } from './Progress';
import { useUploadFile } from './useUploadFile';

type Props = { directory : Directory, onUploadCompleted : () => void }
export type UploaderHandles = { click : () => void }

export const Uploader = forwardRef<UploaderHandles, Props>((props, ref) => {
  const { directory, onUploadCompleted } = props;
  const input = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const uploadFile = useUploadFile();

  useImperativeHandle(ref, () => ({
    click() {
      input.current?.click();
    }
  }));

  const upload = async () => {
    const files = getFiles(input.current?.files);
    if (!files) return;

    setProgress(0);
    const onProgress = (value : number) => { setProgress(value); };
    const payload = { path: directory.path, onProgress, files };
    await uploadFile(payload);
    setProgress(undefined);
    onUploadCompleted();
  };

  return (
    <>
      <Form>
        <input onChange={upload} ref={input} type="file" name="files" multiple />
      </Form>
      <Progress progress={progress} />
    </>
  );
});

const Form = styled.form`
    display: none;
`;

const getFiles = (fileList: FileList | null | undefined) => {
  if(!fileList) return null;
  const files = [] as File[];
  for(let index = 0; index < fileList.length; index++) {
    files.push(fileList[index]);
  }
  return files;
}
