import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import type React from 'react';
import type { ThemeColor } from '../theme/type';
import { mtPrefixCls } from '../utils/config';

export interface ThemeRangeNumberExtProps {
  children: React.ReactNode;
}

export const customStyleWithRangeNumberExt = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  &:not(
      .${prefixCls}-${mtPrefixCls}-number-range-disabled,
        .${prefixCls}-${mtPrefixCls}-number-range-borderless,
        .${prefixCls}-${mtPrefixCls}-number-range-success,
        .${prefixCls}-${mtPrefixCls}-number-range-error,
        .${prefixCls}-${mtPrefixCls}-number-range-warning,
        .${prefixCls}-${mtPrefixCls}-number-range-validating
    ) {
    &:focus-within {
      border: 1px solid ${tokenExt.colorPrimaryL3};
    }
  }
`;

export interface ThemeHermesWithRangeNumberOutLineExtProps {
  children: React.ReactNode;
}

export const customStyleWithRangeNumberOutLineExt = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) =>
  css`
    .${prefixCls}-input-number-input {
      color: ${tokenExt.colorBlackL1};
    }
  `;
