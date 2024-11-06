import { DatePicker } from 'antd';
import React from 'react';
import OutLineWrapper from '../OutLineWrapper';
import { css } from '../utils/emotion';
import type { DatePickerProps } from './type';

const style = (prefixCls: string) => css`
  padding: 0 13px;

  .${prefixCls}-picker {
    padding: 4px 0;
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
      <DatePicker {...restProps} variant="borderless" />
    </OutLineWrapper>
  );
}
