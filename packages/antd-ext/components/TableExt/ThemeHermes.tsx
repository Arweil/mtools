import { css } from '@emotion/css';
import type { GlobalToken } from 'antd/es/theme';
import type { ThemeColor } from '../theme/type';

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  &.${prefixCls}-table-wrapper {
    .${prefixCls}-table-thead {
      & > tr {
        & > th {
          padding: 10px 16px;
          color: ${tokenExt.colorBlackL2};
          font-weight: 500;
          background: ${tokenExt.colorGreyL3};
          &::before {
            display: none;
          }

          .${prefixCls}-skeleton.${prefixCls}-skeleton-element .${prefixCls}-skeleton-input {
            background: ${tokenExt.colorGreyL2};
            border-radius: 0;
          }
        }
      }
    }

    .${prefixCls}-table-tbody {
      & > tr {
        & > td {
          padding: 12px 16px;
          color: ${tokenExt.colorBlackL1};

          .${prefixCls}-skeleton.${prefixCls}-skeleton-element .${prefixCls}-skeleton-input {
            background: ${tokenExt.colorGreyL3};
            border-radius: 0;
          }
        }
      }
    }

    .${prefixCls}-table-ping-left {
      .${prefixCls}-table-cell-fix-left-last {
        &::after {
          width: 1px;
          background: ${tokenExt.colorGreyL2};
          box-shadow: initial;
        }
      }
      &:not(.${prefixCls}-table-has-fix-left) {
        .${prefixCls}-table-container {
          &::before {
            width: 1px;
            background: ${tokenExt.colorGreyL2};
            box-shadow: initial;
          }
        }
      }
    }

    .${prefixCls}-table-ping-right {
      .${prefixCls}-table-cell-fix-right-first {
        &::after {
          width: 1px;
          background: ${tokenExt.colorGreyL2};
          box-shadow: initial;
        }
      }
      &:not(.${prefixCls}-table-has-fix-right) {
        .${prefixCls}-table-container {
          &::after {
            width: 1px;
            background: ${tokenExt.colorGreyL2};
            box-shadow: initial;
          }
        }
      }
    }

    a {
      &.${prefixCls}-typography {
        color: ${tokenExt.colorPrimaryL1};
        &.${prefixCls}-typography-disabled {
          color: ${tokenExt.colorBlackL2};
        }
      }
    }

    .${prefixCls}-typography {
      color: ${tokenExt.colorBlackL1};
    }

    .${prefixCls}-pagination {
      color: ${tokenExt.colorBlackL1};
      .${prefixCls}-pagination-item {
        border: 1px solid ${tokenExt.colorGreyL1};
        border-radius: 3px;
        margin-inline-end: 4px;
        a {
          color: ${tokenExt.colorBlackL1};
        }
        &.${prefixCls}-pagination-item-active {
          font-weight: 400;
          border: 1px solid ${tokenExt.colorPrimaryL1};
          a {
            color: ${tokenExt.colorPrimaryL1};
          }
        }
        &:not(.${prefixCls}-pagination-item-active) {
          &:hover,
          &:active {
            background-color: initial;
            border: 1px solid ${tokenExt.colorPrimaryL1};
            a {
              color: ${tokenExt.colorPrimaryL1};
            }
          }
        }
      }
      .${prefixCls}-pagination-total-text {
        color: ${tokenExt.colorBlackL3};
        margin-inline-end: 12px;
      }
      .${prefixCls}-pagination-disabled {
        .${prefixCls}-pagination-item-link {
          color: ${tokenExt.colorBlackL2};
        }
      }
      .${prefixCls}-pagination-prev {
        margin-inline-end: 4px;
        button {
          color: ${tokenExt.colorBlackL2};
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
          color: ${tokenExt.colorBlackL2};
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
          color: ${tokenExt.colorBlackL1};
          border-radius: 3px;
        }
      }
      .${prefixCls}-select-single .${prefixCls}-select-selector {
        color: ${tokenExt.colorBlackL1};
        border-radius: 3px;
      }
    }
  }
`;
