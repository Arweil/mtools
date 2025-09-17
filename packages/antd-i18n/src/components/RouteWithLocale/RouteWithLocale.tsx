import type React from 'react';
import { useEffect, useState } from 'react';
import { loadRouteLocale } from '../../language';
import type { TypeLanguage } from '../../types';

export interface RouteWithLocaleProps {
  language: TypeLanguage;
  module: string;
  element: React.ReactNode;
  localeFile: () => Promise<{ default: Record<string, any> }>;
}

export default function RouteWithLocale(props: RouteWithLocaleProps): React.ReactNode {
  const [loaded, setLoaded] = useState(false);
  const { module, element, language, localeFile } = props;

  useEffect(() => {
    (async () => {
      try {
        setLoaded(false);
        await loadRouteLocale({ module, language, localeFile });
      } finally {
        setLoaded(true);
      }
    })().catch(() => console.log('切换语言失败'));
  }, [module, language, localeFile]);

  return loaded ? element : 'Loading...';
}
