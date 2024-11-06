import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../theme/type';
import { css } from '../utils/emotion';

export const customPopupStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  &.${prefixCls}-picker-dropdown
    .${prefixCls}-picker-year-panel
    .${prefixCls}-picker-cell-inner,
    &.${prefixCls}-picker-dropdown
    .${prefixCls}-picker-quarter-panel
    .${prefixCls}-picker-cell-inner,
    &.${prefixCls}-picker-dropdown
    .${prefixCls}-picker-month-panel
    .${prefixCls}-picker-cell-inner {
    width: 48px;
    height: 48px;
    padding: 0;
    line-height: 48px;
  }

  &.ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-in-range::before {
    background: ${tokenExt.colorWeakPrimary};
  }
`;

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  &.${prefixCls}-picker {
    color: ${tokenExt.colorBlackL1};
  }
`;
