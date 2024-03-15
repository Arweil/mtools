import React, { useContext } from 'react';
import { AntdExtGlobalContext } from '../ConfigProviderExt/context';
import { NotificationGlobalStyle } from '../Notification';
import { usePrefixCls } from '../utils';
import useTokenExt from '../utils/useTokenExt';

export default function GlobalStyle() {
  const { prefixCls } = usePrefixCls();
  const { themeExt } = useContext(AntdExtGlobalContext);
  const finTheme = themeExt;
  const tokenExt = useTokenExt(finTheme);

  return (
    <>
      <NotificationGlobalStyle prefixCls={prefixCls} theme={finTheme} tokenExt={tokenExt} />
    </>
  );
}
