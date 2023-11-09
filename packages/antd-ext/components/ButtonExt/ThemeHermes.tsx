import React from 'react';
import { ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import type { GlobalToken } from 'antd/es/theme/interface';
import type { ThemeColor } from '../theme/type';
import type { ThemeProps } from '../utils/useMapTheme';

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
      background: #ffffff;
    }
  }

  &.${prefixCls}-btn-primary {
    &.${prefixCls}-btn-background-ghost {
      &:not(:disabled) {
        &:hover {
          background: ${tokenExt.colorWeakPrimary};
        }
        &:active {
          background: rgba(51, 112, 255, 0.16);
        }
      }
      &:disabled {
        color: ${tokenExt.colorGreyL1};
        background: #ffffff;
        border-color: ${tokenExt.colorGreyL1};
      }
    }
    &:disabled {
      color: #ffffff;
      background: ${tokenExt.colorGreyL1};
      border-color: ${tokenExt.colorGreyL1};
    }
  }
`;

export function Theme(props: ThemeProps) {
  const { children, tokenExt } = props;
  const { colorPrimaryL1, colorPrimaryL2, colorPrimaryL3, colorGreyL1, colorBlackL1 } =
    tokenExt || {};

  return (
    <ConfigProvider
      autoInsertSpaceInButton={false}
      theme={{
        token: {
          borderRadius: 4,
          // primary
          colorPrimary: colorPrimaryL1,
          colorPrimaryHover: colorPrimaryL2,
          colorPrimaryActive: colorPrimaryL3,
          // default
          colorBorder: colorGreyL1,
          colorText: colorBlackL1,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
