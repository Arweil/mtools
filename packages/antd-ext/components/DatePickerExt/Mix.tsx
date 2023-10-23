import React, { useMemo } from 'react';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import ThemeHermesWithDatePicker, { customPopupStyle } from './ThemeHermes';
import classNames from 'classnames';
import type { Theme } from '../ConfigProviderExt/context';
import { useMapTheme } from '../utils';
import type {
  RangePickerProps,
  QuarterPicker,
  YearPicker,
  MonthPickerProps,
  WeekPicker,
  TimePicker,
} from './type';

export type MixinHOCProps = (DatePickerProps | RangePickerProps | QuarterPicker) & {
  theme?: Theme;
  popupClassName?: string | undefined;
  className?: string;
  children: (classes: string, popupClassName: string | undefined) => JSX.Element;
};

export function MixHOC(props: MixinHOCProps) {
  const { className, theme, popupClassName, children } = props;
  const { classes, ThemeWrapper, token, prefix, globalTheme } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermesWithDatePicker,
    },
    emotioncss: {},
  });

  const _popupClassName = useMemo(() => {
    return {
      hermes: classNames(customPopupStyle(token, prefix), popupClassName),
      zeus: popupClassName,
      default: popupClassName,
    }[theme || globalTheme];
  }, [token, prefix, theme, globalTheme, popupClassName]);

  return <ThemeWrapper>{children(classes, _popupClassName)}</ThemeWrapper>;
}

export type MixinDatePickerExtProps = DatePickerProps & {
  theme?: Theme;
};

export default function MixinDatePicker(props: MixinDatePickerExtProps) {
  return (
    <MixHOC {...props}>
      {(classes, _popupClassName) => (
        <DatePicker
          style={{ width: '100%' }}
          {...props}
          className={classes}
          popupClassName={_popupClassName}
        />
      )}
    </MixHOC>
  );
}

export type MixinRangePickerExtProps = RangePickerProps & {
  theme?: Theme;
};

MixinDatePicker.RangePicker = (props: MixinRangePickerExtProps) => {
  return (
    <MixHOC {...props}>
      {(classes, _popupClassName) => (
        <DatePicker.RangePicker
          style={{ width: '100%' }}
          {...props}
          className={classes}
          popupClassName={_popupClassName}
        />
      )}
    </MixHOC>
  );
};

export type MixinQuarterPickerExtProps = QuarterPicker & {
  theme?: Theme;
};

MixinDatePicker.QuarterPicker = (props: MixinQuarterPickerExtProps) => {
  return (
    <MixHOC {...props}>
      {(classes, _popupClassName) => (
        <DatePicker.QuarterPicker
          style={{ width: '100%' }}
          {...props}
          className={classes}
          popupClassName={_popupClassName}
        />
      )}
    </MixHOC>
  );
};

export type MixinYearPickerExtProps = YearPicker & {
  theme?: Theme;
};

MixinDatePicker.YearPicker = (props: MixinYearPickerExtProps) => {
  return (
    <MixHOC {...props}>
      {(classes, _popupClassName) => (
        <DatePicker.YearPicker
          style={{ width: '100%' }}
          {...props}
          className={classes}
          popupClassName={_popupClassName}
        />
      )}
    </MixHOC>
  );
};

export type MixinMonthPickerExtProps = MonthPickerProps & {
  theme?: Theme;
};

MixinDatePicker.MonthPicker = (props: MixinMonthPickerExtProps) => {
  return (
    <MixHOC {...props}>
      {(classes, _popupClassName) => (
        <DatePicker.MonthPicker
          style={{ width: '100%' }}
          {...props}
          className={classes}
          popupClassName={_popupClassName}
        />
      )}
    </MixHOC>
  );
};

export type MixinWeekPickerExtProps = WeekPicker & {
  theme?: Theme;
};

MixinDatePicker.WeekPicker = (props: MixinWeekPickerExtProps) => {
  return (
    <MixHOC {...props}>
      {(classes, _popupClassName) => (
        <DatePicker.WeekPicker
          style={{ width: '100%' }}
          {...props}
          className={classes}
          popupClassName={_popupClassName}
        />
      )}
    </MixHOC>
  );
};

export type MixinTimePickerExtProps = TimePicker & {
  theme?: Theme;
};

MixinDatePicker.TimePicker = (props: MixinTimePickerExtProps) => {
  return (
    <MixHOC {...props}>
      {(classes, _popupClassName) => (
        <DatePicker.TimePicker
          style={{ width: '100%' }}
          {...props}
          className={classes}
          popupClassName={_popupClassName}
        />
      )}
    </MixHOC>
  );
};
