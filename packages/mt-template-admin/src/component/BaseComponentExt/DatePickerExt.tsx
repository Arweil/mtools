/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DatePicker, DatePickerProps } from 'antd';
import moment from 'moment';

export type DatePickerExtProps = DatePickerProps & {
  readonly?: boolean;
};

export default function DatePickerExt(props: DatePickerExtProps): JSX.Element {
  const { readonly, ...restProps } = props;
  if (readonly) {
    return <>{moment.isMoment(props.value) ? moment(props.value).format('YYYY-MM-DD') : ''}</>;
  }

  return <DatePicker style={{ width: '100%' }} {...restProps} />;
}
