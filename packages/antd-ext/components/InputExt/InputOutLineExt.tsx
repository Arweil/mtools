import React from 'react';
import { InputExt } from './InputExt';
import { css } from '@emotion/css';
import type { InputProps } from 'antd';
import OutLineWrapper from '../OutLineWrapper';

const style = (prefixCls: string) => css`
  border: 1px solid #D0D3D6;
  border-radius: 4px;
  padding: 0 13px;

  .${prefixCls}-form-item-label {
    height: 30px;
    min-width: 70px;
    text-align: right;
    > label {
      height: 30px;
      line-height: 30px;
      color: #8F959E;
      &::after {
        content: ":";
        position: relative;
        margin-block: 0;
        margin-inline-start: 2px;
        margin-inline-end: 8px;
      }
    }
  }

  .${prefixCls}-input {
    padding: 4px 0;
    color: #333;
    width: 100%;
  }
  .${prefixCls}-input-affix-wrapper{
    padding: 4px 0;
  }

  &:focus-within {
    border: 1px solid #2D64E5;
  }

  &:hover {
    border: 1px solid #477EFF;
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
