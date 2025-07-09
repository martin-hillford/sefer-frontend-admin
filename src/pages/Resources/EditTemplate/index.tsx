import { useQueryString } from 'util/useRouting';
import { useGet } from 'sefer-fetch';
import { JumbotronLayout } from 'sefer/components';
import { Grid } from 'sefer/icons';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { SingleTemplate } from './SingleTemplate';
import { TemplateForm } from './TemplateForm';

export default () => {
  const { language, name, type } = useQueryString();
  const url = `/admin/templates/single?name=${name}&language=${language}&type=${type}`;
  const template = useGet<SingleTemplate>(url);
  const terms = useLocalization(localization);

  const crumbs = [
    { label: terms.templates, link: '/content/templates' },
    { label: terms.template.replace("@name", template?.name ?? '') },
  ];

  return (
    <JumbotronLayout overflow="auto" icon={<Grid size={13} />} title={terms.templates} subTitle={terms.subTitle} crumbs={crumbs}>
      <TemplateForm
        template={template}
        language={language as string}
        name={name as string}
        type={type as string} />
    </JumbotronLayout>
  );
}

