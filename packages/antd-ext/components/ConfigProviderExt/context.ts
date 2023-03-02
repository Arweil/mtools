import React from 'react';

export const AntdExtGlobalContext = React.createContext<{
  themeExt: Theme;
}>({
  themeExt: 'hermes',
});

export type Theme = 'hermes' | 'zeus' | 'default';
