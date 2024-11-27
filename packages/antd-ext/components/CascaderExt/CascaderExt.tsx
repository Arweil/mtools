import { css } from '@emotion/css';
import type { CascaderProps, GlobalToken, TooltipProps } from 'antd';
import { Cascader, theme, Typography } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
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
  }
`;

const cascaderStyle = (token: GlobalToken, prefixCls: string) => css`
  .${prefixCls}-select-selector {
    .${prefixCls}-select-selection-item {
      background: ${token.colorTextLightSolid};
      border-radius: 2px;
    }
  }
`;

const { useToken } = theme;

export type DefaultOptionExtType = Partial<DefaultOptionType>;

export interface CascaderExtProps extends CascaderProps {
  tooltip?: TooltipProps;
  itemStyle?: any;
  tokenExt?: Partial<ThemeColor>;
}

export default function CascaderExt(props: CascaderExtProps) {
  const { options, popupClassName, style, fieldNames, tooltip, itemStyle, tokenExt, ...restProps } =
    props;

  const { prefixCls } = usePrefixCls();

  const { token } = useToken();

  const filterOption = useCallback((inputValue: string, option: DefaultOptionType) => {
    if (Object.prototype.toString.call(option.relLabel) === '[object String]') {
      // 转换成小写，英文时比较适用
      return (option.relLabel as string).toLowerCase().includes(inputValue.toLowerCase());
    }
    if (Object.prototype.toString.call(option.relLabel) === '[object Number]') {
      return `${option.relLabel as number}`.includes(inputValue);
    }
    return false;
  }, []);

  const formattedPopupClassName = useMemo(
    () => classNames(popupClassName, popup(token, prefixCls)),
    [popupClassName, token, prefixCls],
  );

  const CascaderClassName = useMemo(
    () => classNames(cascaderStyle(token, prefixCls)),
    [token, prefixCls],
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
    <div className={CascaderClassName}>
      <Cascader
        allowClear
        showSearch
        options={options}
        style={{ minWidth: 130, ...style }}
        fieldNames={fieldNames}
        dropdownMenuColumnStyle={itemStyle?.dropdownMenuColumnStyle}
        optionRender={optionRenderContent}
        popupClassName={formattedPopupClassName}
        {...restProps}
      />
    </div>
  );
}
