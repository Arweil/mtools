/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DatePicker, DatePickerProps } from 'antd';

export default function DatePickerExt(props: DatePickerProps): JSX.Element {
  return (
    <DatePicker
      style={{ width: '100%' }}
      {...props}
    />
  );
}
