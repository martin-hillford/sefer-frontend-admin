import { Template } from 'types/data/resources/Template';
import { useGet } from 'sefer-fetch';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { JumbotronLayout, Loading } from 'sefer/components';
import { File } from 'sefer/icons';
import { Overview } from './Overview';


export default () => {
  const data = useGet<Template[]>('/admin/templates');
  const terms = useLocalization(localization);
  const crumbs = [
    { label: terms.templates },
  ];

  // For the rest of the page it is helpful to add an id to the data
  const templates = data?.map(template => ({ ...template, id: template.name }));

  return (
    <JumbotronLayout overflow="auto" icon={<File size={13} />} title={terms.templates} subTitle={terms.subTitle} crumbs={crumbs}>
      {!templates && <Loading variant="huge" />}
      {templates && <Overview templates={templates} />}
    </JumbotronLayout>
  );
}
