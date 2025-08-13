import { Template } from 'types/data/resources/Template';
import { Button, ButtonGroup, EntitiesPanel, EntityForm } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useState } from 'react';
import { TemplateDetails } from './TemplateDetails';
import { useLanguage } from 'sefer/hooks';
import { AvailableLanguages } from 'components/LanguageDropDown';
import { Pencil } from 'sefer/icons';
import { DownloadButton } from './Download';

export const Overview = (props : { templates: Array<Template & { id: string}>}) => {
  const terms = useLocalization(localization);
  const lang = useLanguage() as AvailableLanguages;
  const [ selected, setSelected ] = useState<Template>();
  const [ language, setLanguage ] = useState<AvailableLanguages>(lang);
  const [ type, setType ] = useState<"html" | "text">("text");

  const { templates } = props;
  const onRenderItem = (template: Template) => ({ label: template.name, child: template.name });
  const link = `/content/templates/edit?name=${selected?.name}&language=${language}&type=${type}`;

  const buttons = (
    <ButtonGroup $pull="right">
      <Button link={link} label={terms.edit} icon={<Pencil size={13} />} />
    </ButtonGroup>
  )


  return (<EntitiesPanel
    data={templates}
    name="templates"
    onRenderItem={onRenderItem}
    header={terms.templates}
    onSelect={setSelected}
    additionalButtons={<DownloadButton />}
  >
    <EntityForm buttons={buttons}>
      <TemplateDetails
        template={selected}
        setLanguage={setLanguage}
        language={language}
        type={type}
        setType={setType}
      />
    </EntityForm>
  </EntitiesPanel>
  )
}
