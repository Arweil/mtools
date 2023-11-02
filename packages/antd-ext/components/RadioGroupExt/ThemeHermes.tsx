import type React from 'react';
import type { GlobalToken } from 'antd';
import { css } from '@emotion/css';
import {
  colorPrimaryL1,
  colorPrimaryL2,
  colorWeakPrimary,
  colorBlackL2,
  colorGreyL1,
  colorGreyL5,
} from '../theme/hermes';

export interface ThemeProps {
  children: React.ReactNode;
}

export const customStyle = (token: GlobalToken, prefixCls: string) => css`
  &.${prefixCls}-radio-group-solid
    .${prefixCls}-radio-button-wrapper-checked:not(.${prefixCls}-radio-button-wrapper-disabled) {
    z-index: initial;
    color: ${colorPrimaryL1};
    background: ${colorWeakPrimary};
    border-color: ${colorWeakPrimary};
  }

  .${prefixCls}-radio-button-wrapper {
    min-width: 80px;
    color: ${colorBlackL2};
    background: ${colorGreyL5};
    border: 0;

    &:first-child {
      border-inline-start: 0;
    }

    &:not(:first-child)::before {
      width: 2px;
      background-color: #ffffff;
    }

    &:not(.${prefixCls}-radio-button-wrapper-disabled):hover {
      color: ${colorPrimaryL2};
    }
  }

  .${prefixCls}-radio-button-wrapper-disabled {
    color: #ffffff;
    background: ${colorGreyL1};
  }
`;
