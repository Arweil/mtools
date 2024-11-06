import type { GlobalToken } from 'antd';
import { mtPrefixCls } from '../../utils/config';
import { css } from '../../utils/emotion';

export const getRangeNumberStyle = (token: GlobalToken, prefixCls: string) => css`
  border: 1px solid ${token.colorBorder};
  border-radius: 6px;

  .${prefixCls}-input-number {
    flex: 1;
    &:first-of-type {
      .${prefixCls}-input-number-handler {
        border-inline-end: 1px solid ${token.colorBorder};
      }

      .${prefixCls}-input-number-handler-up {
        border-start-end-radius: 0px;
      }

      .${prefixCls}-input-number-handler-down {
        border-end-end-radius: 0px;
      }
    }
  }

  .${prefixCls}-${mtPrefixCls}-number-range-separator {
    padding: 0 8px;
    color: ${token.colorBorder};
    line-height: 30px;
  }

  .${prefixCls}-space-compact {
    width: 100%;
  }

  &.${prefixCls}-${mtPrefixCls}-number-range-disabled {
    .${prefixCls}-${mtPrefixCls}-number-range-separator {
      background-color: ${token.colorBgContainerDisabled};
    }

    .${prefixCls}-input-number-disabled {
      background-color: ${token.colorBgContainerDisabled};
    }
  }

  .${prefixCls}-input-number-compact-item:not(.${prefixCls}-input-number-compact-last-item) {
    margin-inline-end: 0px;
  }

  &.${prefixCls}-${mtPrefixCls}-number-range-borderless {
    border: 0;
    border-radius: 0;
  }

  &:not(
      .${prefixCls}-${mtPrefixCls}-number-range-disabled,
        .${prefixCls}-${mtPrefixCls}-number-range-borderless,
        .${prefixCls}-${mtPrefixCls}-number-range-success,
        .${prefixCls}-${mtPrefixCls}-number-range-error,
        .${prefixCls}-${mtPrefixCls}-number-range-warning,
        .${prefixCls}-${mtPrefixCls}-number-range-validating
    ) {
    &:hover {
      border: 1px solid ${token.colorPrimaryHover};
    }

    &:focus-within {
      border: 1px solid ${token.colorPrimary};
    }
  }

  &.${prefixCls}-${mtPrefixCls}-number-range {
    &.${prefixCls}-${mtPrefixCls}-number-range-error {
      border-color: ${token.colorError};
      &:hover {
        border-color: ${token.colorErrorBorderHover};
      }
    }
  }

  &.${prefixCls}-${mtPrefixCls}-number-range {
    &.${prefixCls}-${mtPrefixCls}-number-range-warning {
      border-color: ${token.colorWarning};
      &:hover {
        border-color: ${token.colorWarningBorderHover};
      }
    }
  }
`;
