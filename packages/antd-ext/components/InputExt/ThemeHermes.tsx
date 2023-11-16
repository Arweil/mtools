import React from 'react';
import { ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../theme/type';
import type { ThemeProps } from '../utils/useMapTheme';

export const customStyleWithInputOutLineExt = (token: GlobalToken, prefixCls: string) => css``;

export const customStyleWithInputExt = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  &:focus {
    border-color: ${tokenExt.colorPrimaryL3};
  }

  &.${prefixCls}-input-disabled {
    border-color: ${tokenExt.colorGreyL1};
  }
`;
