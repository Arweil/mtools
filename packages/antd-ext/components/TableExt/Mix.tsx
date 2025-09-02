import type { TooltipProps } from 'antd';
import { Table } from 'antd';
import React, { useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import useTokenExt from '../utils/useTokenExt';
import type { TableExtProps } from './TableExt';
import TableExt, { SkeletonItem } from './TableExt';
import { customStyle as customStyleHermes } from './ThemeHermes';

const { Summary } = Table;

export interface TableExtMixinProps extends TableExtProps {
  theme?: Theme;
}

export default function Mixin(props: TableExtMixinProps) {
  const { className, theme: customTheme, rowSelection, tdTooltip, ...restProps } = props;
  const { classes, themeConfig, theme } = useMapTheme({
    className,
    theme: customTheme,
    emotioncss: {
      hermes: customStyleHermes,
      zeus: customStyleHermes,
    },
  });
  const tokenExt = useTokenExt(theme);

  // tooltip 默认样式
  const toolTipStyle: TooltipProps = useMemo(() => {
    const { styles, ...restTooltipProps } = tdTooltip || {};
    return {
      hermes: {
        color: tokenExt.colorWhite,
        styles: {
          root: { maxWidth: 280, ...styles?.root },
          body: { color: tokenExt.colorBlackL1, ...styles?.body },
        },
        ...restTooltipProps,
      } as TooltipProps,
      zeus: {
        color: tokenExt.colorWhite,
        styles: {
          root: { maxWidth: 280, ...styles?.root },
          body: { color: tokenExt.colorBlackL1, ...styles?.body },
        },
        ...restTooltipProps,
      } as TooltipProps,
      default: tdTooltip,
    }[theme];
  }, [theme, tokenExt, tdTooltip]);

  // rowSelection 默认样式
  const rowSelectionStyle = useMemo(
    () =>
      ({
        hermes: {
          columnWidth: 48,
        },
        zeus: {
          columnWidth: 48,
        },
        default: {},
      }[theme]),
    [theme],
  );

  return (
    <ThemeWrapper theme={themeConfig} type="Table">
      <TableExt
        tdTooltip={toolTipStyle}
        rowSelection={
          rowSelection
            ? {
                ...rowSelectionStyle,
                ...rowSelection,
              }
            : undefined
        }
        {...restProps}
        className={classes}
      />
    </ThemeWrapper>
  );
}

Mixin.Summary = Summary;

Mixin.SkeletonItem = SkeletonItem;
