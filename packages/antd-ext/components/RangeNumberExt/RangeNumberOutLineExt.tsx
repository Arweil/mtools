import { css } from '@emotion/css';
import React from 'react';
import type { OutLineWrapperProps } from '../OutLineWrapper';
import OutLineWrapper from '../OutLineWrapper';
import type { RangeNumberExtProps } from './RangeNumberExt';
import RangeNumberExt from './RangeNumberExt';

const style = (prefixCls: string, mtPrefixCls: string) => css`
  .${prefixCls}-input-number-input {
    width: 100%;
    padding: 4px 0;
  }

  &.${prefixCls}-${mtPrefixCls}-outline-disabled {
    .${prefixCls}-${mtPrefixCls}-number-range-disabled {
      .${prefixCls}-${mtPrefixCls}-number-range-separator {
        background-color: initial;
      }

      .${prefixCls}-input-number-disabled {
        background-color: initial;
      }
    }
  }
`;

export interface RangeNumberOutLineExtProps
  extends Omit<OutLineWrapperProps, 'disabled'>,
    RangeNumberExtProps {}

export default function RangeNumberOutLineExt(props: RangeNumberOutLineExtProps) {
  const { label, disabled, ...restProps } = props;
  return (
    <OutLineWrapper
      label={label}
      injectStyle={style}
      disabled={disabled}
      isRequired={restProps['aria-required'] === 'true'}
    >
      <RangeNumberExt {...restProps} bordered={false} disabled={disabled as boolean} />
    </OutLineWrapper>
  );
}
