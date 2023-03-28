import React, { useMemo } from 'react';
import { Theme } from '../ConfigProviderExt/context';
import TableExt from './TableExt';
import {
  Theme as ThemeHermes,
  customStyle as customStyleHermes} from "./ThemeHermes";
import type { TableExtProps } from './TableExt';
import useMapTheme from '../utils/useMapTheme';

export interface TableExtMinixProps extends TableExtProps {
  theme?: Theme;
}

export default function Minix(props: TableExtMinixProps) {
  const { className, theme: customTheme, rowSelection, ...restProps } = props;
  const { classes, ThemeWrapper, globalTheme } = useMapTheme({
    className,
    theme: customTheme,
    themeWrap: {
      hermes: ThemeHermes,
    },
    emotioncss: {
      hermes: customStyleHermes,
    }
  });

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
    }[customTheme || globalTheme]
  ), [customTheme, globalTheme]);

  // rowSelection 默认样式
  const rowSelectionStyle = useMemo(() => (
    {
      hermes: {
        columnWidth: 48,
      },
      zeus: {},
      default: {},
    }[customTheme || globalTheme]
  ), [customTheme, globalTheme]);

  return (
    <ThemeWrapper>
      <TableExt
        tdTooltip={toolTipStyle}
        rowSelection={rowSelection ? {
          ...rowSelectionStyle,
          ...rowSelection,
        } : undefined}
        {...restProps}
        className={classes}
      />
    </ThemeWrapper>
  );
}
