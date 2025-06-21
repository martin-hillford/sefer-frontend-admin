import { useEffect, useState } from 'react';
import { Group } from './types';

export const useFetchNavigation = () => {
  const [ navigation, setNavigation ] = useState<Group[] | undefined>();

  useEffect(() => {
    fetch("/navigation.json").then(response => {
      if(!response.ok) return;
      response.json().then(json  => setNavigation(json as Group[]));
    })

  }, []);

  return navigation;
}
