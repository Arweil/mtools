import React from 'react';
import type { ThemeColor } from '../theme/type';

export const AntdExtGlobalContext = React.createContext<{
  themeExt: Theme;
  mergedTokenExt?: ThemeColor;
}>({
  themeExt: 'hermes',
  mergedTokenExt: undefined,
});

export type Theme = 'hermes' | 'zeus' | 'default';
