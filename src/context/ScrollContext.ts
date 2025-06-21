import React, { useContext } from 'react';

export const ScrollContext = React.createContext<HTMLDivElement | null | undefined>(null);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  return new Scroller(context);
};

export class Scroller {
  private element : HTMLElement | null | undefined;

  constructor(element : HTMLDivElement | null | undefined) {
    this.element = element || document.getElementById('ref-scrollpanel');
  }

  public toTop() {
    this.element?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  public toBottom() {
    this.element?.scrollTo({ top: this.element.scrollHeight, left: 0, behavior: 'smooth' });
  }
}
