import React, { useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import TableExt, { SkeletonItem } from './TableExt';
import { customStyle as customStyleHermes } from './ThemeHermes';
import type { TableExtProps } from './TableExt';
import useMapTheme from '../utils/useMapTheme';
import { Table } from 'antd';
import ThemeWrapper from '../theme/ThemeWrapper';

const { Summary } = Table;

export interface TableExtMixinProps extends TableExtProps {
  theme?: Theme;
}

export default function Mixin(props: TableExtMixinProps) {
  const { className, theme: customTheme, rowSelection, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme: customTheme,
    emotioncss: {
      hermes: customStyleHermes,
    },
  });

  // tooltip 默认样式
  const toolTipStyle = useMemo(
    () =>
      ({
        hermes: {
          color: '#ffffff',
          overlayStyle: { maxWidth: 280 },
          overlayInnerStyle: { color: '#333' },
        },
        zeus: {},
        default: {},
      }[customTheme]),
    [customTheme],
  );

  // rowSelection 默认样式
  const rowSelectionStyle = useMemo(
    () =>
      ({
        hermes: {
          columnWidth: 48,
        },
        zeus: {},
        default: {},
      }[customTheme]),
    [customTheme],
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
