import { css } from '@emotion/css';
import type { GlobalToken, TooltipProps, TreeSelectProps } from 'antd';
import { theme, TreeSelect } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import NotFoundContent from '../NotFoundContent';
import type { ThemeColor } from '../theme/type';
import { usePrefixCls } from '../utils';

const popup = (token: GlobalToken, prefixCls: string) => css`
  min-height: 148px;
  .ant-select-selector {
    padding: 0;
  }
  .${prefixCls}-select-tree {
    .${prefixCls}-select-tree-switcher {
      width: 16px;
      height: 16px;
      margin: 8px 4px 0 0;
      line-height: 16px;
    }
    .${prefixCls}-select-tree-switcher:not(.${prefixCls}-select-tree-switcher-noop):hover {
      background-color: ${token.colorTextDescription};
    }
    .${prefixCls}-select-tree-checkbox {
      margin: 8px 0 0 0;
    }
    .${prefixCls}-select-tree-checkbox+span {
      margin: 0 4px;
      padding: 0;
    }
  }
`;

const treeSelectStyle = (token: GlobalToken, prefixCls: string) => css`
  .${prefixCls}-select-selector {
    .${prefixCls}-select-selection-item {
      background: ${token.colorTextDescription};
      border-radius: 2px;
    }
  }
`;

const { useToken } = theme;

export interface TreeSelectExtProps extends TreeSelectProps {
  tooltip?: TooltipProps;
  itemStyle?: any;
  tokenExt?: Partial<ThemeColor>;
  customTheme?: Theme;
}

export default function TreeSelectExt(props: TreeSelectExtProps) {
  const {
    popupClassName,
    style,
    fieldNames,
    tooltip,
    itemStyle,
    tokenExt,
    customTheme,
    ...restProps
  } = props;

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

  const TreeSelectClassName = useMemo(
    () => classNames(treeSelectStyle(token, prefixCls)),
    [token, prefixCls],
  );

  return (
    <div className={TreeSelectClassName}>
      <TreeSelect
        allowClear
        style={{ minWidth: 130, ...style }}
        fieldNames={fieldNames}
        notFoundContent={<NotFoundContent />}
        popupClassName={customTheme === 'hermes' ? formattedPopupClassName : undefined}
        {...restProps}
      />
    </div>
  );
}
