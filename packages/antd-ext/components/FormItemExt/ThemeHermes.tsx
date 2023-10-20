import React from 'react';
import { ConfigProvider } from 'antd';
import type { GlobalToken } from 'antd';
import { css } from '@emotion/css';
import {
  colorPrimaryL1,
  colorPrimaryL3,
  colorError,
  colorWarning,
  colorGreyL1,
  colorBlackL3,
  colorGreyL4,
} from '../theme/hermes';

export interface ThemeProps {
  children: React.ReactNode;
}

export const customStyle = (token: GlobalToken, prefixCls: string) => css`
  border-radius: 4px;
  border: 1px solid ${colorGreyL1};
  padding-left: 12px;
  position: relative;
  flex-wrap: nowrap;
  margin-bottom: 22px;

  input {
    padding-left: 0;
  }

  &.${prefixCls}-form-item-focused {
    border-color: ${colorPrimaryL3};
  }
  &.${prefixCls}-form-item-has-error {
    border-color: ${colorError};
  }
  &.${prefixCls}-form-item-has-warning {
    border-color: ${colorWarning};
  }

  .${prefixCls}-select-selection-item {
    background-color: ${colorGreyL4};
  }
  &:hover:not(
      .${prefixCls}-form-item-has-warning,.${prefixCls}-form-item-has-error,.${prefixCls}-form-item-focused
    ),
  &:focus:not(
      .${prefixCls}-form-item-has-warning,.${prefixCls}-form-item-has-error,.${prefixCls}-form-item-focused
    ) {
    border-color: ${colorPrimaryL3};
  }
  .${prefixCls}-form-item-with-help .${prefixCls}-form-item-explain {
    position: absolute;
  }

  .${prefixCls}-form-item-control-input-content {
    line-height: normal;
  }

  .${prefixCls}-select-selector {
    //max-height: 70px;
    overflow-y: auto;
  }

  .${prefixCls}-form-item-label {
    flex-shrink: 0;

    > label {
      height: 32px;
      color: ${colorBlackL3};
    }
  }

  .${prefixCls}-tree-select {
    padding-left: 0;
    overflow: visible !important;
  }

  .${prefixCls}-picker {
    padding-left: 0;
    background-color: transparent !important;
  }

  .${prefixCls}-picker-active-bar {
    transform: translateX(-11px);
  }

  .${prefixCls}-select {
    > .${prefixCls}-select-selector {
      padding-left: 0;

      > .${prefixCls}-select-selection-item {
      }
    }
  }

  .${prefixCls}-select-single.${prefixCls}-select-show-arrow .${prefixCls}-select-selection-search {
    left: 0;
  }

  .${prefixCls}-select-multiple {
    .${prefixCls}-select-selection-placeholder {
      left: 0;
    }

    .${prefixCls}-select-selection-search {
      margin-left: 0;
    }
  }
`;

export default function ThemeHermesWithFormItemExt(props: ThemeProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorPrimaryL1,
        },
      }}
    >
      {props.children}
    </ConfigProvider>
  );
}
