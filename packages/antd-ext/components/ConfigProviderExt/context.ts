import React from 'react';
import type { ThemeColor } from '../theme/type';

export const AntdExtGlobalContext = React.createContext<{
  themeExt: Theme;
  tokenExt?: Partial<ThemeColor>;
}>({
  themeExt: 'hermes',
  tokenExt: undefined,
});

export type Theme = 'hermes' | 'zeus' | 'default';
