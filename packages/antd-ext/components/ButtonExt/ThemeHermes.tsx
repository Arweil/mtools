import React from "react";
import { ConfigProvider } from "antd";
import { css } from "@emotion/css";
import {
  colorPrimaryL1,
  colorPrimaryL2,
  colorPrimaryL3,
  colorGreyL1,
  colorGreyL5,
  colorBlackL1,
  colorGreyL3,
  colorWeakPrimary,
} from '../theme/hermes';
import type { GlobalToken } from "antd/es/theme/interface";

export interface ThemeProps {
  children: React.ReactNode;
}

export const customStyle = (token: GlobalToken, prefixCls: string) => css`
  min-width: 74px;

  &.${prefixCls}-btn-default {
    &.${prefixCls}-btn-background-ghost {
      &:not(:disabled) {
        color: ${colorBlackL1};
        &:hover {
          background: #F2F3F5;
        }
        &:active {
          background: ${colorGreyL3};
        }
      }
      &:disabled {
        border-color: ${colorGreyL1};
      }
    }
    &:not(:disabled) {
      &:hover {
        color: ${colorBlackL1};
        border-color: ${colorGreyL1};
        background-color: ${colorGreyL5};
      }
      &:active {
        color: ${colorBlackL1};
        border-color: ${colorGreyL1};
        background-color: ${colorGreyL3};
      }
    }
  }

  &.${prefixCls}-btn-primary {
    &.${prefixCls}-btn-background-ghost {
      &:not(:disabled) {
        &:hover {
          background: ${colorWeakPrimary};
        }
        &:active {
          background: rgba(51,112,255,0.16);
        }
      }
      &:disabled {
        color: ${colorGreyL1};
        border-color: ${colorGreyL1};
      }
    }
    &:disabled {
      color: #FFFFFF;
      border-color: ${colorGreyL1};
    }
  }
`;

export function Theme(props: ThemeProps) {
  const { children } = props;

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
