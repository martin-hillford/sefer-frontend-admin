import { Button, SavedAlert, SavingAlert } from 'sefer/components';
import { MenuHamburger } from 'sefer/icons';
import { useState } from 'react';
import { Page } from 'types/data/resources/Page';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { usePostMenuSequence } from './usePostMenuSequence';

export const SortingButton = (props : { pages : Page[], sorting : boolean, setSorting: (value:boolean) => void }) => {
  const { pages, sorting, setSorting } = props;
  const [state, setState] = useState('default');
  const variant = sorting ? 'selected' : 'default';
  const onClosed = () => setState('default');
  const terms = useLocalization(localization);
  const postMenuSequence = usePostMenuSequence();

  const onClick = async () => {
    if (!sorting) return setSorting(true);
    setState('saving');
    await postMenuSequence(pages.map(p => p.id));
    setState('saved');
    return setSorting(false);
  };

  return (
    <>
      <Button onClick={onClick} variant={variant} icon={<MenuHamburger size={20} />} />
      <SavingAlert show={state === 'saving'} content={terms.savingMenuOrder} />
      <SavedAlert show={state === 'saved'} onClosed={onClosed} content={terms.menuOrderSaved} />
    </>
  );
};
