import { css } from '@emotion/css';
import { DatePicker } from 'antd';
import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import OutLineWrapper from '../OutLineWrapper';
import type { RangePickerProps } from './type';

const style = (prefixCls: string) => css`
  padding: 0 13px;

  .${prefixCls}-picker {
    width: 100%;
    padding: 4px 0;
    color: #333;
    border: 0px;
  }

  .${prefixCls}-picker-affix-wrapper {
    padding: 4px 0;
  }

  .${prefixCls}-picker-range {
    .${prefixCls}-picker-active-bar {
      margin-inline-start: 0;
    }

    .${prefixCls}-picker-clear {
      inset-inline-end: 0px;
    }
  }
`;

export type RangePickerOutLineExtProps = RangePickerProps & {
  label: string;
  theme?: Theme;
};

export default function RangePickerOutLineExt(props: RangePickerOutLineExtProps) {
  const { label, theme, ...restProps } = props;

  return (
    <OutLineWrapper
      label={label}
      injectStyle={style}
      disabled={restProps.disabled}
      theme={theme}
      isRequired={restProps['aria-required'] === 'true'}
    >
      <DatePicker.RangePicker {...restProps} variant="borderless" />
    </OutLineWrapper>
  );
}
