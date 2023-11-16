import type React from 'react';
import type { GlobalToken } from 'antd';
import { css } from '@emotion/css';
import type { ThemeColor } from '../theme/type';

export interface ThemeProps {
  children: React.ReactNode;
}

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  &.${prefixCls}-radio-group-solid
    .${prefixCls}-radio-button-wrapper-checked:not(.${prefixCls}-radio-button-wrapper-disabled) {
    z-index: initial;
    color: ${tokenExt.colorPrimaryL1};
    background: ${tokenExt.colorWeakPrimary};
    border-color: ${tokenExt.colorWeakPrimary};
  }

  .${prefixCls}-radio-button-wrapper {
    min-width: 80px;
    color: ${tokenExt.colorBlackL2};
    background: ${tokenExt.colorGreyL5};
    border: 0;

    &:first-child {
      border-inline-start: 0;
    }

    &:not(:first-child)::before {
      width: 2px;
      background-color: ${tokenExt.colorWhite};
    }

    &:not(.${prefixCls}-radio-button-wrapper-disabled):hover {
      color: ${tokenExt.colorPrimaryL2};
    }
  }

  .${prefixCls}-radio-button-wrapper-disabled {
    color: ${tokenExt.colorWhite};
    background: ${tokenExt.colorGreyL1};
  }
`;
