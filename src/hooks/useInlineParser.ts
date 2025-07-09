import { useAdminFrontendConfig } from 'hooks/useAdminFrontendConfig';
import { useEffect, useState } from 'react';
import { IInlineParser } from '@martin-hillford/markdown-ts-react';

interface Inline {
  parser: IInlineParser
  color: string
  class: string
}

export const useInlineParser = () => {
  const config = useAdminFrontendConfig();
  const [ parsers, setParsers ] = useState<Inline[] | undefined>();

  useEffect(() => {
    if(!config) return;
    const inlineParsers = config.editor?.filter(e => e.type === "inline");
    if(!inlineParsers || inlineParsers.length === 0) setParsers([]);
    else {
      inlineParsers.forEach(e => {
        import(e.url).then(module => {
          const plugin = module.default as IInlineParser;
          setParsers(parsers => [...(parsers ?? []), { parser: plugin, ...e }]);
        })
      })
    }

  }, [ config?.api])

  return parsers;
}
