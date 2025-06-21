import { Bold, DropDown, ErrorText, Line, Property, Switch, TextField } from 'sefer/components';
import { TextEditor } from 'components';
import { PageType } from 'types/data/resources/PageType';
import { PageWithContent } from 'types/data/resources/PageWithContent';
import Site from 'types/data/resources/Site';
import { Actions } from './Actions';
import usePageContext from './usePageContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  page : PageWithContent
  site?: string | undefined
  setSite? : (value: string | undefined) => void
  sites?: Site[]
  onSaved : (data: PageWithContent) => void
}

export const PageForm = (props : Props) => {
  const { page, site, setSite, sites, onSaved } = props;
  const { context, save } = usePageContext(page, onSaved, site);
  const terms = useLocalization(localization);
  const setContent = (value : string) => context.setValue('content', value);
  const options = sites?.map(s => ({ label: s.hostname, value: s.hostname }));
  options?.unshift({ label: terms.default, value: 'generic' });
  const getLabel = useGetLabel();

  return (
    <>
      <Property label={terms.type}>
        <Bold>{getLabel(context.data.type)}</Bold>
      </Property>
      <Property label={terms.name}>
        <TextField dataContext={context} name="name" />
      </Property>
      <Property label={terms.permalink}>
        <TextField dataContext={context} name="permalink" />
      </Property>
      <Property show={!!options} label={terms.website}>
        {options && <DropDown value={site ?? 'generic'} onChange={setSite} name="site" options={options} />}
      </Property>
      <Property label={terms.published}>
        <Switch dataContext={context} name="isPublished" />
      </Property>
      <Bold>{terms.content}</Bold>
      <TextEditor content={context.data.content} setContent={setContent} />
      <ErrorText>{context.getError('content')}</ErrorText>
      <Line />
      <Actions context={context} onSavePage={save} />
    </>
  );
};

const useGetLabel= () => {
  return (type: PageType) => {
    const terms = useLocalization(localization);
    switch (type) {
      case PageType.AboutUsRootPage:
        return terms.aboutUs;
      case PageType.IndividualPage:
        return terms.individualPage;
      case PageType.PrivacyStatementPage:
        return terms.privacyStatement;
      case PageType.MenuPage:
        return terms.menuPage;
      case PageType.HomePage:
        return terms.homePage;
      case PageType.UsageTermsPage:
        return terms.usageTerms;
      default:
        return '-';
    }
  }
}
