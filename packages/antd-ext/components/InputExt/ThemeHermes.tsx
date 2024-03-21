import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../theme/type';

export const customStyleWithInputOutLineExt = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  .${prefixCls}-input {
    color: ${tokenExt.colorBlackL1};
  }
`;

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
