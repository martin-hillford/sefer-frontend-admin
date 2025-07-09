import { Button, ButtonGroup, Property } from 'sefer/components';
import { File, Trash } from 'sefer/icons';
import { ChangeEvent, useRef } from 'react';
import styled from 'styled-components';
import { DataContext } from 'sefer/types/DataContext';
import { Image } from './Image';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

const accepted = ['image/jpeg', 'image/jpeg', 'image/gif', 'image/png',];

export type ImageSelectorProps<T> = {
    name : string,
    dataContext : DataContext<T>
    label? : string | undefined
}

export function ImageSelector<T>(props : ImageSelectorProps<T>) {
  const { label, dataContext, name } = props;
  if (!label) return <UploaderForm {...props} />;
  return (
    <Property label={label} dataContext={dataContext} name={name}>
      <UploaderForm {...props} />
    </Property>
  );
}

function UploaderForm<T>(props : ImageSelectorProps<T>) {
  const field = useRef<HTMLInputElement>(null);
  const { dataContext, name } = props;
  const terms = useLocalization(localization);

  const onFileUploadClick = () => {
    if (field.current) field.current.click();
  };

  const onClearFileClick = () => {
    dataContext.setValue(`${name}File`, null);
    dataContext.setValue(`${name}Deleted`, true);
    dataContext.setValue(name, null);
  };

  const onFileSelected = (event : ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) return;

    const selected = event?.target?.files[0];
    if (accepted.indexOf(selected.type.toLowerCase()) === -1) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (!ev.target?.result) return;
      dataContext.setValue(name, ev.target.result.toString());
    };
    reader.readAsDataURL(selected);
    dataContext.setValue(`${name}File`, selected);
  };

  const value = dataContext.getValue(name);
  return (
    <Container>
      <div>
        <Image src={value} />
        <Input ref={field} accept=".jpg, .png, .jpeg, .gif|image/*" type="file" onChange={onFileSelected} />
      </div>
      <Buttons>
        <ButtonGroup $pull="right">
          <Button
            show={!!value}
            onClick={onClearFileClick}
            icon={<Trash size={16} />}
            variant="danger"
            label={terms.delete}
          />
          <Button
            onClick={onFileUploadClick}
            icon={<File size={16} />}
            label={terms.file}
          />
        </ButtonGroup>
      </Buttons>
    </Container>
  );
}

const Input = styled.input`
 display: none;
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const Buttons = styled.div`
`;
