import React from 'react';
import type { DatePickerProps } from './type';
import OutLineWrapper from '../OutLineWrapper';
import { DatePicker } from 'antd';
import { css } from '@emotion/css';

const style = (prefixCls: string) => css`
  padding: 0 13px;

  .${prefixCls}-picker {
    padding: 4px 0;
    color: #333;
    width: 100%;
    border: 0px;
  }
  .${prefixCls}-picker-affix-wrapper{
    padding: 4px 0;
  }
`;

export type DatePickerOutLineExtProps = DatePickerProps & {
  label: string;
};

export default function DatePickerOutLineExt(props: DatePickerOutLineExtProps) {
  const { label, ...restProps } = props;

  return (
    <OutLineWrapper
      label={label}
      injectStyle={style}
      disabled={restProps.disabled}
      isRequired={restProps['aria-required'] === 'true'}
    >
      <DatePicker {...restProps} bordered={false} />
    </OutLineWrapper>
  );
}
