import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import { theme, TreeSelect } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import classNames from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import NotFoundContent from '../NotFoundContent';
import OutLineWrapper from '../OutLineWrapper';
import { usePrefixCls } from '../utils';
import type { TreeSelectExtProps } from './TreeSelectExt';

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
    height: 30px !important;
    padding: 0px;
    .${prefixCls}-select-selection-search {
      inset-inline-start: 0;
      margin-inline-start: 0;
    }
    .${prefixCls}-select-selection-placeholder{
      inset-inline-start: 0;
    }
    .${prefixCls}-select-selection-item {
      background: ${token.colorTextDescription};
      border-radius: 2px;
    }
  }
`;

export interface TreeSelectOutLineExtProps extends TreeSelectExtProps {
  label: string;
  customTheme?: Theme; // 他这边有认识的人，我怕他找我事
}

const { useToken } = theme;

export default function TreeSelectExt(props: TreeSelectOutLineExtProps) {
  const { label, disabled, tooltip, popupClassName, customTheme, tokenExt, ...restProps } = props;

  const { prefixCls } = usePrefixCls();
  const { token } = useToken();
  const refTreeSelectOutLine = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(refTreeSelectOutLine.current?.offsetWidth);
  const onDropdownVisibleChange = useCallback((open: boolean) => {
    if (open) {
      setWidth(refTreeSelectOutLine?.current?.offsetWidth || 0);
    }
  }, []);

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
    <OutLineWrapper
      label={label}
      // injectStyle={style}
      disabled={disabled}
      ref={refTreeSelectOutLine}
      isRequired={restProps['aria-required'] === 'true'}
      className={TreeSelectClassName}
    >
      <TreeSelect
        allowClear
        showSearch
        variant="borderless"
        notFoundContent={<NotFoundContent />}
        {...restProps}
        popupClassName={customTheme === 'hermes' ? formattedPopupClassName : undefined}
        onDropdownVisibleChange={onDropdownVisibleChange}
        popupMatchSelectWidth={width}
        placement="bottomRight"
      />
    </OutLineWrapper>
  );
}
