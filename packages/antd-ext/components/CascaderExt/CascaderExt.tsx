import { css } from '@emotion/css';
import type { CascaderProps, GlobalToken, TooltipProps } from 'antd';
import { Cascader, theme, Typography } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import NotFoundContent from '../NotFoundContent';
import type { ThemeColor } from '../theme/type';
import { usePrefixCls } from '../utils';

const popup = (token: GlobalToken, prefixCls: string) => css`
  min-height: 148px;
  .${prefixCls}-cascader-menus {
    .${prefixCls}-typography {
      color: ${token.colorTextLabel};
    }
    .${prefixCls}-typography-disabled {
      color: ${token.colorTextDisabled};
    }
    .${prefixCls}-cascader-checkbox-inner {
      border-radius: 4px;
    }
    .${prefixCls}-cascader-checkbox-disabled {
      .${prefixCls}-cascader-checkbox-inner {
        background: ${token.colorBgContainerDisabled};
      }
    }
    .${prefixCls}-cascader-menu-item {
      .${prefixCls}-cascader-menu-item-expand-icon {
        color: ${token.colorArrow};
      }
    }
  }
`;

const { useToken } = theme;

export interface CascaderExtProps extends CascaderProps {
  tooltip?: TooltipProps;
  itemStyle?: any;
  tokenExt?: Partial<ThemeColor>;
}

export default function CascaderExt<ValueType = any>(props: CascaderExtProps) {
  const { popupClassName, style, fieldNames, tooltip, itemStyle, ...restProps } = props;

  const { prefixCls } = usePrefixCls();

  const { token } = useToken();

  const formattedPopupClassName = useMemo(
    () => classNames(popupClassName, popup(token, prefixCls)),
    [popupClassName, token, prefixCls],
  );

  const optionRenderContent = contentProps => {
    const { disabled, label } = contentProps;
    if (label) {
      return (
        <Typography.Paragraph
          disabled={disabled}
          style={{ marginBottom: 0, maxWidth: 120 }}
          ellipsis={{
            rows: 1,
            expandable: false,
            tooltip: {
              title: label,
              ...tooltip,
            },
          }}
        >
          {label}
        </Typography.Paragraph>
      );
    }

    return <NotFoundContent />;
  };

  return (
    <Cascader<ValueType, DefaultOptionType>
      allowClear
      style={{ minWidth: 130, ...style }}
      fieldNames={fieldNames}
      dropdownMenuColumnStyle={itemStyle?.dropdownMenuColumnStyle}
      optionRender={optionRenderContent}
      popupClassName={formattedPopupClassName}
      {...restProps}
    />
  );
}
