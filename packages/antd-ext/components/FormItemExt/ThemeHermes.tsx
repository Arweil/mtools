import React from 'react';
import { ConfigProvider } from 'antd';
import type { GlobalToken } from 'antd';
import { css } from '@emotion/css';
import {
  colorPrimaryL1,
  colorPrimaryL3,
  colorError,
  colorGreyL1,
  colorBlackL3,
} from '../theme/hermes';

export interface ThemeProps {
  children: React.ReactNode;
}

export const customStyle = (token: GlobalToken, prefixCls: string) => css`
  border-radius: 5px;
  border: 1px solid ${colorGreyL1};
  padding-left: 12px;
  position: relative;
  flex-wrap: nowrap;
  margin-bottom: 22px;

  &.${prefixCls}-form-item-has-error {
    border-color: ${colorError};
  }
  &:hover,
  &:focus {
    border-color: ${colorPrimaryL3};
  }
  .${prefixCls}-form-item-with-help .${prefixCls}-form-item-explain {
    position: absolute;
  }

  .${prefixCls}-form-item-control-input-content {
    line-height: normal;
  }

  .${prefixCls}-select-focused:not(.${prefixCls}-select-disabled).${prefixCls}-select:not(.${prefixCls}-select-customize-input)
    .${prefixCls}-select-selector {
    border: none;
    box-shadow: none;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
    box-shadow: none;
  }

  .${prefixCls}-select-selector {
    max-height: 70px;
    overflow-y: auto;
  }

  .${prefixCls}-form-item-label {
    flex-shrink: 0;

    > label {
      height: 32px;
      color: ${colorBlackL3};
    }
  }

  .${prefixCls}-form-item-control-input {
    height: 32px;
  }

  .${prefixCls}-tree-select {
    padding-left: 0;
    overflow: visible !important;
  }

  .${prefixCls}-picker {
    padding-left: 10px;
    background-color: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
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

  .${prefixCls}-input-affix-wrapper {
    border: none;
  }

  .${prefixCls}-input-affix-wrapper-focused {
    border: none;
    box-shadow: none;
  }

  .${prefixCls}-input-affix-wrapper-focused > input {
    border: none;
    outline: none;
  }

  .${prefixCls}-input-status-error:not(.${prefixCls}-input-disabled):not(
      .${prefixCls}-input-borderless
    ) {
    &.${prefixCls}-input:focus {
      border: none;
      box-shadow: none;
    }

    &.${prefixCls}-input-focused {
      border: none;
      box-shadow: none;
    }
  }

  .${prefixCls}-input {
    //padding-left: 10px;
    border: none;
    box-shadow: none;

    &:hover {
      border: none;
    }

    &:focus {
      border: none;
      box-shadow: none;
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
