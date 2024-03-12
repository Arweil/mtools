import React, { useContext } from 'react';
import { AntdExtGlobalContext } from '../ConfigProviderExt/context';
import { NotificationGlobalStyle } from '../Notification';
import { usePrefixCls } from '../utils';

export default function GlobalStyle() {
  const { prefixCls } = usePrefixCls();
  const { themeExt } = useContext(AntdExtGlobalContext);
  const finTheme = themeExt;

  return (
    <>
      <NotificationGlobalStyle prefixCls={prefixCls} theme={finTheme} />
    </>
  );
}
