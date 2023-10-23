import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import type { Moment } from 'moment';
import type { RangePickerProps } from 'antd/lib/date-picker/generatePicker';

const { RangePicker } = DatePicker;

type RangePickerExtProps = RangePickerProps<Moment> & {
  readonly?: boolean;
};

export default function RangePickerExt(props: RangePickerExtProps): JSX.Element {
  const { readonly, ...resetProps } = props;

  if (readonly) {
    if (resetProps.value) {
      const begin = resetProps.value[0];
      const end = resetProps.value[1];
      return (
        <>
          {`${moment.isMoment(begin) ? begin.format('YYYY-MM-DD') : '?'} ~ ${
            moment.isMoment(end) ? end.format('YYYY-MM-DD') : '?'
          }`}
        </>
      );
    }
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RangePicker style={{ width: '100%' }} {...resetProps} />
  );
}

RangePickerExt.defaultProps = {
  readonly: false,
};
