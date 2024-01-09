import type { GlobalToken } from 'antd';
import { css } from '@emotion/css';
import type { ThemeColor } from '../theme/type';

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  border-radius: 4px;
  border: 1px solid ${tokenExt.colorGreyL1};
  padding-left: 12px;
  position: relative;
  flex-wrap: nowrap;

  input {
    padding-left: 0;
  }

  input.${prefixCls}-input-number-input {
    padding-left: 0;
  }

  &.${prefixCls}-form-item-focused {
    border-color: ${tokenExt.colorPrimaryL3};
  }

  &.${prefixCls}-form-item-has-error {
    border-color: ${tokenExt.colorError};
  }

  &.${prefixCls}-form-item-has-warning {
    border-color: ${tokenExt.colorWarning};
  }

  .${prefixCls}-select-selection-item {
    background-color: ${tokenExt.colorGreyL4};
  }

  &:hover:not(
      .${prefixCls}-form-item-has-warning,.${prefixCls}-form-item-has-error,.${prefixCls}-form-item-focused
    ),
  &:focus:not(
      .${prefixCls}-form-item-has-warning,.${prefixCls}-form-item-has-error,.${prefixCls}-form-item-focused
    ) {
    border-color: ${tokenExt.colorPrimaryL3};
  }

  &:not(
      .${prefixCls}-form-item-has-warning,.${prefixCls}-form-item-has-error,.${prefixCls}-form-item-focused
    ) {
    &:hover,
    &:focus {
      border-color: ${tokenExt.colorPrimaryL3};
    }

    &:focus-within {
      border-color: ${tokenExt.colorPrimaryL3};
    }
  }

  .${prefixCls}-form-item-with-help .${prefixCls}-form-item-explain {
    position: absolute;
  }

  .${prefixCls}-form-item-control-input {
    min-height: 30px;
  }

  .${prefixCls}-form-item-control-input-content {
    line-height: normal;
  }

  .${prefixCls}-form-item-label {
    flex-shrink: 0;
  }

  .${prefixCls}-tree-select {
    padding-left: 0;
    overflow: visible !important;
  }

  .${prefixCls}-picker {
    padding: 3px 11px 3px 0;
    background-color: transparent !important;
  }

  .${prefixCls}-picker-active-bar {
    transform: translateX(-11px);
  }

  .${prefixCls}-select {
    > .${prefixCls}-select-selector {
      padding: 0 4px 0 0;

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
