import React from 'react';
import type { ThemeColor } from '../theme/type';

export const AntdExtGlobalContext = React.createContext<{
  themeExt: Theme;
  mergedTokenExt?: Partial<ThemeColor>;
}>({
  themeExt: 'hermes',
  mergedTokenExt: {},
});

export type Theme = 'hermes' | 'zeus' | 'default';
