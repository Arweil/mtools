import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../theme/type';
import { css } from '../utils/emotion';

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
  > .${prefixCls}-input-group
    > .${prefixCls}-input-group-addon:last-child
    .${prefixCls}-input-search-button:not(.${prefixCls}-btn-primary) {
    color: rgba(0, 0, 0, 0.35);
    &:hover {
      border-color: ${tokenExt.colorPrimaryL1};
    }
  }
  .anticon.${prefixCls}-input-password-icon {
    color: rgba(0, 0, 0, 0.35);
  }

  &.${prefixCls}-input-disabled {
    border-color: ${tokenExt.colorGreyL1};
  }
`;
