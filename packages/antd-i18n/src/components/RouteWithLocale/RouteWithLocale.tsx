import type React from 'react';
import { useEffect, useState } from 'react';
import { loadMultipleRouteLocales } from '../../language';
import type { TypeLanguage } from '../../types';

export interface RouteWithLocaleProps {
  language: TypeLanguage;
  modules: string[];
  element: React.ReactNode;
  localeFiles: (() => Promise<{ default: Record<string, any> }>)[];
}

export default function RouteWithLocale(props: RouteWithLocaleProps): React.ReactNode {
  const [loaded, setLoaded] = useState(false);
  const { modules, element, language, localeFiles } = props;

  useEffect(() => {
    (async () => {
      try {
        setLoaded(false);
        // 批量加载所有 module 的语言包
        await loadMultipleRouteLocales({
          modules,
          language,
          localeFiles,
        });
      } finally {
        setLoaded(true);
      }
    })().catch(e => console.log('切换语言失败', e));
  }, [modules, language, localeFiles]);

  return loaded ? element : 'Loading...';
}
