import React from 'react';
import { css } from '@emotion/css';
import type { GlobalToken } from 'antd/es/theme';
import {
  colorPrimaryL1,
  colorBlackL1,
  colorBlackL2,
  colorGreyL1,
  colorGreyL3,
  colorBlackL3,
  colorGreyL2,
} from '../theme/hermes';
import { ConfigProvider } from 'antd';

export interface ThemeProps {
  children: React.ReactNode;
}

export const customStyle = (token: GlobalToken, prefixCls: string) => css`
  &.${prefixCls}-table-wrapper {
    .${prefixCls}-table-thead {
      & > tr {
        & > th {
          padding: 10px 16px;
          color: ${colorBlackL2};
          font-weight: 500;
          background: ${colorGreyL3};
          &::before {
            display: none;
          }

          .${prefixCls}-skeleton.${prefixCls}-skeleton-element .${prefixCls}-skeleton-input {
            background: ${colorGreyL2};
            border-radius: 0;
          }
        }
      }
    }

    .${prefixCls}-table-tbody {
      & > tr {
        & > td {
          padding: 12px 16px;
          color: ${colorBlackL1};

          .${prefixCls}-skeleton.${prefixCls}-skeleton-element .${prefixCls}-skeleton-input {
            background: ${colorGreyL3};
            border-radius: 0;
          }
        }
      }
    }

    .${prefixCls}-table-ping-left {
      .${prefixCls}-table-cell-fix-left-last {
        &::after {
          width: 1px;
          background: ${colorGreyL2};
          box-shadow: initial;
        }
      }
      &:not(.${prefixCls}-table-has-fix-left) {
        .${prefixCls}-table-container {
          &::before {
            width: 1px;
            background: ${colorGreyL2};
            box-shadow: initial;
          }
        }
      }
    }

    .${prefixCls}-table-ping-right {
      .${prefixCls}-table-cell-fix-right-first {
        &::after {
          width: 1px;
          background: ${colorGreyL2};
          box-shadow: initial;
        }
      }
      &:not(.${prefixCls}-table-has-fix-right) {
        .${prefixCls}-table-container {
          &::after {
            width: 1px;
            background: ${colorGreyL2};
            box-shadow: initial;
          }
        }
      }
    }

    a {
      &.${prefixCls}-typography {
        color: ${colorPrimaryL1};
        &.${prefixCls}-typography-disabled {
          color: ${colorBlackL2};
        }
      }
    }

    .${prefixCls}-typography {
      color: ${colorBlackL1};
    }

    .${prefixCls}-pagination {
      color: ${colorBlackL1};
      .${prefixCls}-pagination-item {
        border: 1px solid ${colorGreyL1};
        border-radius: 3px;
        margin-inline-end: 4px;
        a {
          color: ${colorBlackL1};
        }
        &.${prefixCls}-pagination-item-active {
          font-weight: 400;
          border: 1px solid ${colorPrimaryL1};
          a {
            color: ${colorPrimaryL1};
          }
        }
        &:not(.${prefixCls}-pagination-item-active) {
          &:hover,
          &:active {
            background-color: initial;
            border: 1px solid ${colorPrimaryL1};
            a {
              color: ${colorPrimaryL1};
            }
          }
        }
      }
      .${prefixCls}-pagination-total-text {
        color: ${colorBlackL3};
        margin-inline-end: 12px;
      }
      .${prefixCls}-pagination-disabled {
        .${prefixCls}-pagination-item-link {
          color: ${colorBlackL2};
        }
      }
      .${prefixCls}-pagination-prev {
        margin-inline-end: 4px;
        button {
          color: ${colorBlackL2};
        }
        &:hover,
        &:active {
          .${prefixCls}-pagination-item-link {
            background-color: initial;
          }
        }
      }
      .${prefixCls}-pagination-next {
        button {
          color: ${colorBlackL2};
        }
        &:hover,
        &:active {
          .${prefixCls}-pagination-item-link {
            background-color: initial;
          }
        }
      }
      .${prefixCls}-pagination-options {
        margin-inline-start: 12px;
      }
      .${prefixCls}-pagination-options-quick-jumper {
        margin-inline-start: 12px;
        input {
          color: ${colorBlackL1};
          border-radius: 3px;
        }
      }
      .${prefixCls}-select-single .${prefixCls}-select-selector {
        color: ${colorBlackL1};
        border-radius: 3px;
      }
    }
  }
`;

export function Theme(props: ThemeProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorPrimary: colorPrimaryL1,
            borderRadiusLG: 0,
            controlItemBgActive: '#ffffff',
            controlItemBgActiveHover: colorGreyL3,
          },
        },
      }}
    >
      {props.children}
    </ConfigProvider>
  );
}
