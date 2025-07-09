import { Button } from 'sefer/components';
import { Support } from 'sefer/icons';
import { useAdminFrontendConfig } from 'hooks/useAdminFrontendConfig';
import { UserBase } from 'types/data/users/UserBase';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useGetAsync } from 'sefer-fetch';

export const ImpersonationButton = (props : {user : UserBase | undefined}) => {
  const { user } = props;
  const config = useAdminFrontendConfig();
  const terms = useLocalization(localization);
  const get = useGetAsync<{ query: string }>()

  if (!user || !user.allowImpersonation) return null;

  const impersonate = async () => {
    const tokenUrl = `/admin/users/get-impersonation-url?userId=${user.id}`;
    const result = await get(tokenUrl);
    const { query } = result.body!;
    const redirect = `${config?.publicSite}/impersonation?${query}`;
    window.open(redirect, '_blank');
  };

  return <Button label={terms.impersonate} onClick={() => impersonate()} icon={<Support size={16} />} />
};
