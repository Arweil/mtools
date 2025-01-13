import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import { theme, TreeSelect, Typography } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import NotFoundContent from '../NotFoundContent';
import OutLineWrapper from '../OutLineWrapper';
import { usePrefixCls } from '../utils';
import type { TreeSelectExtProps } from './TreeSelectExt';

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

const treeSelectStyle = (token: GlobalToken, prefixCls: string) => css`
  .${prefixCls}-select-selector {
    height: 30px !important;
    padding: 0px !important;
    .${prefixCls}-select-selection-search {
      inset-inline-start: 0;
      margin-inline-start: 0;
    }
    .${prefixCls}-select-selection-placeholder{
      inset-inline-start: 0;
    }
  }
`;

export interface TreeSelectOutLineExtProps extends TreeSelectExtProps {
  label: string;
  customTheme?: Theme;
}

const { useToken } = theme;

export default function TreeSelectExt(props: TreeSelectOutLineExtProps) {
  const { label, disabled, tooltip, popupClassName, customTheme, ...restProps } = props;

  const { prefixCls } = usePrefixCls();
  const { token } = useToken();
  const refTreeSelectOutLine = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(refTreeSelectOutLine.current?.offsetWidth);
  const onDropdownVisibleChange = useCallback((open: boolean) => {
    if (open) {
      setWidth(refTreeSelectOutLine?.current?.offsetWidth || 0);
    }
  }, []);

  const formattedPopupClassName = useMemo(
    () => classNames(popupClassName, popup(token, prefixCls)),
    [popupClassName, token, prefixCls],
  );

  const TreeSelectClassName = useMemo(
    () => classNames(treeSelectStyle(token, prefixCls)),
    [token, prefixCls],
  );

  // TODO maxWidth 不确定
  const optionRenderContent = contentProps => {
    const { disabled: contentDisabled, title } = contentProps;
    if (title) {
      return (
        <Typography.Paragraph
          disabled={contentDisabled}
          style={{ maxWidth: 120, lineHeight: '32px' }}
          ellipsis={{
            rows: 1,
            expandable: false,
            tooltip: {
              title,
              ...tooltip,
            },
          }}
        >
          {title}
        </Typography.Paragraph>
      );
    }
    return <NotFoundContent />;
  };

  return (
    <OutLineWrapper
      label={label}
      disabled={disabled}
      ref={refTreeSelectOutLine}
      className={TreeSelectClassName}
    >
      <TreeSelect
        allowClear
        showSearch
        // treeTitleRender={optionRenderContent}
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
