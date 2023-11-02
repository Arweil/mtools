import React from 'react';
import OutLineWrapper from '../OutLineWrapper';
import RangeNumberExt from './RangeNumberExt';
import type { OutLineWrapperProps } from '../OutLineWrapper';
import type { RangeNumberExtProps } from './RangeNumberExt';
import { css } from '@emotion/css';

const style = (prefixCls: string) => css`
  .${prefixCls}-input-number-input {
    width: 100%;
    padding: 4px 0;
    color: #333;
  }
`;

export interface RangeNumberOutLineExtProps extends OutLineWrapperProps, RangeNumberExtProps {}

export default function RangeNumberOutLineExt(props: RangeNumberOutLineExtProps) {
  const { label, ...restProps } = props;
  return (
    <OutLineWrapper label={label} injectStyle={style} disabled={restProps.disabled}>
      <RangeNumberExt {...restProps} bordered={false} />
    </OutLineWrapper>
  );
}
