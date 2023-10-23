import React from 'react';
import { InputExt } from './InputExt';
import { css } from '@emotion/css';
import type { InputProps } from 'antd';
import OutLineWrapper from '../OutLineWrapper';

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

export interface InputOutLineExtProps extends InputProps {
  label: string;
}

export default function InputOutLineExt(props: InputOutLineExtProps) {
  const { label, ...restProps } = props;

  return (
    <OutLineWrapper label={label} injectStyle={style}>
      <InputExt bordered={false} {...restProps} />
    </OutLineWrapper>
  );
}
