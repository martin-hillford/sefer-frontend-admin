import { useState, useEffect } from 'react';

export const useIsMobile = (threshold : number) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= threshold);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= threshold);
    };
    window.addEventListener('resize', onResize);

    return () => { window.removeEventListener('resize', onResize); };
  }, [threshold]);

  return isMobile;
};