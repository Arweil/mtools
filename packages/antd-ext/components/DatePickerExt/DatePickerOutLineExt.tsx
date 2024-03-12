import { css } from '@emotion/css';
import { DatePicker } from 'antd';
import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import OutLineWrapper from '../OutLineWrapper';
import type { DatePickerProps } from './type';

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
  theme?: Theme;
};

export default function DatePickerOutLineExt(props: DatePickerOutLineExtProps) {
  const { label, theme, ...restProps } = props;

  return (
    <OutLineWrapper
      label={label}
      injectStyle={style}
      disabled={restProps.disabled}
      theme={theme}
      isRequired={restProps['aria-required'] === 'true'}
    >
      <DatePicker {...restProps} variant="borderless" />
    </OutLineWrapper>
  );
}
