import { useState } from 'react';
import { User } from 'types/data/users/User';
import { State } from 'types/ui/State';
import { useGet } from 'sefer-fetch';
import { useSystemSettings } from 'hooks/useSystemSettings';
import { usePostSettings } from './usePostSettings';
import { useDataContext } from './useDataContext';

export const useConfig = () => {
  const [state, setState] = useState<State>(State.Editing);
  const [ settings, refresh ] = useSystemSettings();
  const context = useDataContext(settings);
  const admins = useGet<User[]>('/users/administrators');
  const postSettings = usePostSettings();

  const save = async () => {
    if (!context) return;
    if (!await context.validate()) return;
    setState(State.Saving);
    await postSettings({ ...context.data });
    setState(State.Saved);
    refresh()
  };

  const onClosed = () => setState(State.Editing);
  return { context, admins, state, save, onClosed };
};
