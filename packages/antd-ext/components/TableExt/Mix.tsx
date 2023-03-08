import React, { useContext, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';
import classNames from 'classnames';
import { AntdExtGlobalContext, Theme } from '../ConfigProviderExt/context';
import TableExt from './TableExt';
import {
  Theme as ThemeHermes,
  customStyle as customStyleHermes,
  ThemeProps
} from "./ThemeHermes";
import type { TableExtProps } from './TableExt';

const { useToken } = theme;

export interface TableExtMinixProps extends TableExtProps {
  theme?: Theme;
}

export default function Minix(props: TableExtMinixProps) {
  const { token } = useToken();
  const { themeExt } = useContext(AntdExtGlobalContext);
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const { className, theme: customTheme, rowSelection, ...restProps } = props;

  const classes = useMemo(
    () => (
      {
        hermes: classNames(className, [customStyleHermes(token, getPrefixCls())]),
        zeus: classNames(className),
        default: classNames(className),
      }[customTheme || themeExt]
    ),
    [className, token, customTheme, themeExt]
  );

  const Theme = useMemo(() => (
    {
      hermes: ThemeHermes,
      zeus: (props: ThemeProps) => <>{props.children}</>,
      default: (props: ThemeProps) => <>{props.children}</>,
    }[customTheme || themeExt]
  ), [customTheme, themeExt]);

  // tooltip 默认样式
  const toolTipStyle = useMemo(() => (
    {
      hermes: {
        color: '#ffffff',
        overlayStyle: { maxWidth: 280 },
        overlayInnerStyle: { color: '#333' },
      },
      zeus: {},
      default: {},
    }[customTheme || themeExt]
  ), [customTheme, themeExt]);

  // rowSelection 默认样式
  const rowSelectionStyle = useMemo(() => (
    {
      hermes: {
        columnWidth: 48,
      },
      zeus: {},
      default: {},
    }[customTheme || themeExt]
  ), [customTheme, themeExt]);

  return (
    <Theme>
      <TableExt
        className={classes}
        tdTooltip={toolTipStyle}
        rowSelection={rowSelection ? {
          ...rowSelectionStyle,
          ...rowSelection,
        } : undefined}
        {...restProps}
      />
    </Theme>
  );
}
