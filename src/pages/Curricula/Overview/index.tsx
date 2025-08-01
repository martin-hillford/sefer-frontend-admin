import { JumbotronLayout, Loading } from 'sefer/components';
import { Education } from 'sefer/icons';
import { Entities } from './Entities';
import { useCurricula } from './useCurricula';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const { curricula, reload, onDelete } = useCurricula();
  const terms = useLocalization(localization)
  const crumbs = [{ label: terms.curriculums }];

  return (
    <JumbotronLayout icon={<Education size={13} />} title={terms.title} subTitle={terms.subTitle} crumbs={crumbs}>
      { !curricula && <Loading variant="large" /> }
      { curricula && <Entities curricula={curricula} reload={reload} onDelete={onDelete} />}
    </JumbotronLayout>
  );
};
