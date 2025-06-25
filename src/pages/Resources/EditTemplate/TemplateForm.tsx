import { SingleTemplate } from './SingleTemplate';
import { Bold, Container, Empty, Loading, Property, TextArea, TextField } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePut } from 'sefer-fetch';
import { Actions } from './Actions';

interface Props {
  template: SingleTemplate | undefined | null
  language: string
  name: string
  type: string
}

export const TemplateForm = (props : Props) => {
  const { template, language, name, type } = props;
  const saveTemplate = usePut<boolean>();
  const terms = useLocalization(localization);
  const [ title, setTitle ] = useState(template?.title);
  const [ content, setContent ] = useState(template?.content);

  useEffect(() => {
    setTitle(template?.title);
    setContent(template?.content);
  }, [ template ])


  const onSave = async () => {
    if(!template) return false;
    const url = `/admin/templates/${template.id}`;
    const { code } = await saveTemplate(url, { title, content });
    return code === 204;
  }

  if(!template) return <Loading variant="huge" />;
  return (
    <Container>
      <Property label={terms.type}>
        <Bold><Empty value={type} /></Bold>
      </Property>
      <Property label={terms.language}>
        <Bold><Empty value={language} /></Bold>
      </Property>
      <Property label={terms.name}>
        <Bold><Empty value={name} /></Bold>
      </Property>
      <Property label={terms.layoutName}>
        <Bold><Empty value={template?.layoutName} /></Bold>
      </Property>
      <Property label={terms.title}>
        <TextField name="title" value={title} onChange={setTitle} />
      </Property>
      <Property label={terms.content}>
        <Wrapper>
          <TextArea name="content" value={content} onChange={setContent} />
        </Wrapper>
      </Property>
      <Actions onSave={onSave} />
    </Container>
  )
}

const Wrapper = styled.div`
    textarea { min-height: 400px}  
`
