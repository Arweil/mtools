import React from 'react';
import OutLineWrapper from '../OutLineWrapper';
import type { OutLineWrapperProps } from '../OutLineWrapper';
import type { ProInputNumberProps } from './ProInputNumber';
import ProInputNumber from './ProInputNumber';
import { css } from '@emotion/css';

const style = (prefixCls: string) => css`
  padding: 0 13px;

  .${prefixCls}-input {
    padding: 4px 0;
    color: #333;
    width: 100%;
  }
  .${prefixCls}-input-affix-wrapper{
    padding: 4px 0;
  }
`;

export interface ProInputNumberOutLineProps
  extends OutLineWrapperProps,
    Omit<ProInputNumberProps, 'children'> {}

export default function ProInputNumberOutLine(props: ProInputNumberOutLineProps) {
  const { label, ...restProps } = props;
  return (
    <OutLineWrapper label={label} injectStyle={style} disabled={restProps.disabled}>
      <ProInputNumber {...restProps} bordered={false} />
    </OutLineWrapper>
  );
}
