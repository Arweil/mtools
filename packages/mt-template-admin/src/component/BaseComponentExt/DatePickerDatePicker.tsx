/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import { DatePicker, DatePickerProps } from 'antd';
import { Moment } from 'moment';

interface DatePickerDatePickerProps {
  value?: [Moment | null, Moment | null];
  onChange?: (params: [Moment | null, Moment | null]) => void;
  datePickerProps?: DatePickerProps;
}

interface DatePickerDatePickerState {
  startValue: Moment | null;
  endValue: Moment | null;
}

export default class DatePickerDatePicker extends PureComponent<
  DatePickerDatePickerProps,
  DatePickerDatePickerState
> {
  constructor(props: Readonly<DatePickerDatePickerProps>) {
    super(props);

    this.state = {
      startValue: null,
      endValue: null,
    };

    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.disabledStartDate = this.disabledStartDate.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
  }

  static getDerivedStateFromProps(
    nextProps: DatePickerDatePickerProps,
  ): DatePickerDatePickerState | null {
    if ('value' in nextProps) {
      if (nextProps.value && nextProps.value.length > 0) {
        return {
          startValue: nextProps.value[0],
          endValue: nextProps.value[1],
        };
      }

      return {
        startValue: null,
        endValue: null,
      };
    }

    return null;
  }

  onStartChange(date: Moment | null): void {
    if (!('value' in this.props)) {
      this.setState({ startValue: date }, () => {
        const { endValue } = this.state;
        this.onChange([date, endValue]);
      });
    } else {
      const { endValue } = this.state;
      this.onChange([date, endValue]);
    }
  }

  onEndChange(date: Moment | null): void {
    if (!('value' in this.props)) {
      this.setState({ endValue: date }, () => {
        const { startValue } = this.state;
        this.onChange([startValue, date]);
      });
    } else {
      const { startValue } = this.state;
      this.onChange([startValue, date]);
    }
  }

  onChange(params: [Moment | null, Moment | null]): void {
    const { onChange } = this.props;
    if (onChange) {
      onChange(params);
    }
  }

  disabledStartDate(startValue?: Moment): boolean {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate(endValue?: Moment): boolean {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  render(): JSX.Element {
    const { datePickerProps } = this.props;
    const { startValue, endValue } = this.state;

    return (
      <div className="flex-cnt">
        <DatePicker
          {...datePickerProps}
          disabledDate={this.disabledStartDate}
          value={startValue}
          placeholder="开始时间"
          onChange={this.onStartChange}
        />
        <span className="ant-calendar-range-picker-separator"> ~ </span>
        <DatePicker
          {...datePickerProps}
          disabledDate={this.disabledEndDate}
          value={endValue}
          placeholder="结束时间"
          onChange={this.onEndChange}
        />
      </div>
    );
  }
}
