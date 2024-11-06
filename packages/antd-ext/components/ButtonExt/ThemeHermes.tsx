import { TinyColor } from '@ctrl/tinycolor';
import type { GlobalToken } from 'antd/es/theme/interface';
import type { ThemeColor } from '../theme/type';
import { css } from '../utils/emotion';

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  min-width: 74px;

  .${prefixCls}-btn-link {
    min-width: initial;
  }

  &.${prefixCls}-btn-default {
    &.${prefixCls}-btn-background-ghost {
      &:not(:disabled) {
        color: ${tokenExt.colorBlackL1};
        &:hover {
          background: ${tokenExt.colorGreyL5};
        }
        &:active {
          background: ${tokenExt.colorGreyL3};
        }
      }
      &:disabled {
        border-color: ${tokenExt.colorGreyL1};
      }
    }
    &:not(:disabled) {
      &:hover {
        color: ${tokenExt.colorBlackL1};
        background-color: ${tokenExt.colorGreyL5};
        border-color: ${tokenExt.colorGreyL1};
      }
      &:active {
        color: ${tokenExt.colorBlackL1};
        background-color: ${tokenExt.colorGreyL3};
        border-color: ${tokenExt.colorGreyL1};
      }
    }
    &:disabled {
      background: ${tokenExt.colorWhite};
    }
  }

  &.${prefixCls}-btn-primary {
    &.${prefixCls}-btn-background-ghost {
      &:not(:disabled) {
        &:hover {
          background: ${tokenExt.colorWeakPrimary};
        }
        &:active {
          background: ${new TinyColor(tokenExt.colorPrimaryL1).setAlpha(0.16).toRgbString()};
        }
      }
      &:disabled {
        color: ${tokenExt.colorGreyL1};
        background: ${tokenExt.colorWhite};
        border-color: ${tokenExt.colorGreyL1};
      }
    }
    &:disabled {
      color: ${tokenExt.colorWhite};
      background: ${tokenExt.colorGreyL1};
      border-color: ${tokenExt.colorGreyL1};
    }
  }
`;
