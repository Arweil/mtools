import { css } from '@emotion/css';
import type { GlobalToken, TooltipProps, TreeSelectProps } from 'antd';
import { theme, TreeSelect } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import NotFoundContent from '../NotFoundContent';
import type { ThemeColor } from '../theme/type';
import { usePrefixCls } from '../utils';

const popup = (token: GlobalToken, prefixCls: string) => css`
  min-height: 148px;
  &.${prefixCls}-select-dropdown {
    padding: 8px;
  }
  .${prefixCls}-select-tree {
    .${prefixCls}-select-tree-treenode {
      padding: 0;
      border-radius: ${token.borderRadiusXS}px;
      &:hover {
        background-color: ${token.colorTextDescription};
      }
    }
    .${prefixCls}-select-tree-treenode-selected {
      background-color: ${token.colorTextDescription};
    }
    .${prefixCls}-select-tree-switcher {
      width: 16px;
      height: 16px;
      margin: 8px 4px 0 4px;
      line-height: 16px;
      &:not(.${prefixCls}-select-tree-switcher-noop):hover {
        background-color: transparent;
      }
    }
    // 偏移块
    .${prefixCls}-select-tree-indent-unit {
      width: 16px;
    }
    .${prefixCls}-select-tree-node-content-wrapper {
      height: 32px;
      transition: none;
    }
    .${prefixCls}-select-tree-checkbox {
      margin: 8px 2px 0 0;
    }
    .${prefixCls}-select-tree-checkbox+span:hover {
      background-color: transparent;
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
  const { popupClassName, style, fieldNames, customTheme, ...restProps } = props;

  const { prefixCls } = usePrefixCls();
  const { token } = useToken();
  const treeRef = useRef(null);

  const formattedPopupClassName = useMemo(
    () => classNames(popupClassName, popup(token, prefixCls)),
    [popupClassName, token, prefixCls],
  );

  return (
    <div ref={treeRef}>
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
