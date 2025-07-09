import { Template } from 'types/data/resources/Template';
import { localization } from './localization';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { DropDownOption } from 'sefer/components/DropDown';
import { AvailableLanguages, LanguageDropDown } from 'components/LanguageDropDown';
import { DropDown, Line, Property } from 'sefer/components';
import styled from 'styled-components';

interface Props {
  template : Template | null | undefined;
  setLanguage: (language: AvailableLanguages) => void;
  language: AvailableLanguages;
  type: "html" | "text";
  setType: (type: "html" | "text") => void;
}
const typeOptions = [{  label: "html", value: "html" }, { label: "text", value: "text" }] as DropDownOption<'html' | 'text'>[];

export const TemplateDetails = (props : Props) => {
  const { template, type, language, setType, setLanguage } = props;
  const terms = useLocalization(localization);
  if(!template) return null;

  const data = template.languages.find(l => l.language === language);
  const title = data?.title;
  const content = type === "html" ? data?.html?.content : data?.text?.content;
  const layoutName = type === "html" ? data?.html?.layoutName : data?.text?.layoutName;

  return (
    <>
      <Selector>
        <div>{terms.language}</div>
        <LanguageDropDown selected={language} setSelected={setLanguage} />
        <div>{terms.type}</div>
        <DropDown name="type" options={typeOptions} onChange={setType} value={type} />
      </Selector>
      <Line />
      <Property label={terms.layoutName}>{layoutName}</Property>
      <Property label={terms.title}>{title}</Property>
      <Property label={terms.content}><Text>{content}</Text></Property>
    </>
  );
};

const Selector = styled.div`
    display: flex;
    div { display: flex; align-items: center; padding-right: 8px; font-weight: bold; }
    margin-bottom: -12px;
`

const Text = styled.div`
  white-space: pre-line;
`
