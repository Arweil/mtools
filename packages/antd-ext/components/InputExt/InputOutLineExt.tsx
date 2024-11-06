import type { InputProps } from 'antd';
import React from 'react';
import OutLineWrapper from '../OutLineWrapper';
import { css } from '../utils/emotion';
import { InputExt } from './InputExt';

const style = (prefixCls: string) => css`
  padding: 0 13px;

  .${prefixCls}-input {
    padding: 4px 0;
    width: 100%;
  }
  .${prefixCls}-input-affix-wrapper{
    padding: 4px 0;
    
    &:focus-within {
      box-shadow: none;
    }
  }
  .${prefixCls}-input-show-count-suffix {
    color: rgba(0, 0, 0, 0.25);
  }
`;

export interface InputOutLineExtProps extends InputProps {
  label: string;
}

export default function InputOutLineExt(props: InputOutLineExtProps) {
  const { label, ...restProps } = props;

  return (
    <OutLineWrapper
      label={label}
      injectStyle={style}
      disabled={restProps.disabled}
      isRequired={restProps['aria-required'] === 'true'}
    >
      <InputExt {...restProps} bordered={false} />
    </OutLineWrapper>
  );
}
