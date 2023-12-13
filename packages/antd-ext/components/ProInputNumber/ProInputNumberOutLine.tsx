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

    &:focus-within {
      box-shadow: none;
    }
  }
`;

export interface ProInputNumberOutLineProps
  extends Omit<OutLineWrapperProps, 'disabled'>,
    Omit<ProInputNumberProps, 'children'> {}

export default function ProInputNumberOutLine(props: ProInputNumberOutLineProps) {
  const { label, disabled, ...restProps } = props;
  return (
    <OutLineWrapper
      label={label}
      injectStyle={style}
      disabled={disabled}
      isRequired={restProps['aria-required'] === 'true'}
    >
      <ProInputNumber {...restProps} bordered={false} disabled={disabled} />
    </OutLineWrapper>
  );
}
