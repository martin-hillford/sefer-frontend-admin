import { useEffect, useState } from 'react';
import { TwoFactorAuthSetup } from 'types/data/settings/TwoFactorAuthSetup';
import { useFetchTwoFactorAuthEnabled } from './useFetchTwoFactorAuthEnabled';
import { useFetchTwoFactorAuthSetup } from './useFetchTwoFactorAuthSetup';
import { usePostTwoFactorAuthDisable } from './usePostTwoFactorAuthDisable';
import { usePostTwoFactorAuthSetup } from './usePostTwoFactorAuthSetup';

export enum TwoFactorAuthState {
    Loading, Enabled, Disabled,
    Setup, SetupInvalidCode, SetupCompleted,
    Disabling, DisablingInvalidCode, DisablingCompleted
}

export const useAuthentication = () => {
  const [state, setState] = useState(TwoFactorAuthState.Loading);
  const [setup, setSetup] = useState<TwoFactorAuthSetup | undefined>();
  const [backup, setBackup] = useState<string[] | undefined>();
  const fetchTwoFactorAuthEnabled = useFetchTwoFactorAuthEnabled();
  const fetchTwoFactorAuthSetup = useFetchTwoFactorAuthSetup();
  const postTwoFactorAuthDisable = usePostTwoFactorAuthDisable();
  const postTwoFactorAuthSetup = usePostTwoFactorAuthSetup();

  const fetch = async () => {
    const isEnabled = await fetchTwoFactorAuthEnabled();
    setState(isEnabled ? TwoFactorAuthState.Enabled : TwoFactorAuthState.Disabled);
  };

  useEffect(() => { fetch().then() }, []);

  const onEnable = async () => {
    setState(TwoFactorAuthState.Loading);
    setSetup(await fetchTwoFactorAuthSetup());
    setState(TwoFactorAuthState.Setup);
  };

  const onActivate = async (code : string) => {
    setState(TwoFactorAuthState.Loading);
    const result = await postTwoFactorAuthSetup(code);
    if (!result) return setState(TwoFactorAuthState.SetupInvalidCode);
    setBackup(result);
    return setState(TwoFactorAuthState.SetupCompleted);
  };

  const onCompleted = () => {
    setState(TwoFactorAuthState.Loading);
    fetch().then();
  };

  const onDisable = async (code : string) => {
    setState(TwoFactorAuthState.Loading);
    const result = await postTwoFactorAuthDisable(code);
    if (!result) setState(TwoFactorAuthState.DisablingInvalidCode);
    else setState(TwoFactorAuthState.DisablingCompleted);
  };

  const onDisableSetup = () => setState(TwoFactorAuthState.Disabling);

  return { state, onEnable, setup, onActivate, backup, onCompleted, onDisable, onDisableSetup } as TwoFactorAuth;
};

export type TwoFactorAuth = {
    state : TwoFactorAuthState;
    onEnable : () => Promise<void>;
    setup : TwoFactorAuthSetup | undefined;
    onActivate : (code : string) => Promise<void>;
    backup: string[] | undefined;
    onCompleted : () => void;
    onDisableSetup : () => void;
    onDisable : (code : string) => Promise<void>;
}
