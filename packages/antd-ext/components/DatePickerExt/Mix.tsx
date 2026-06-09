import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import { AntdExtGlobalContext } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import { useMapTheme } from '../utils';
import type { DatePickerOutLineExtProps } from './DatePickerOutLineExt';
import DatePickerOutLineExt from './DatePickerOutLineExt';
import type { RangePickerOutLineExtProps } from './RangePickerOutLineExt';
import RangePickerOutLineExt from './RangePickerOutLineExt';
import { customPopupStyle, customStyle } from './ThemeHermes';
import type {
  MonthPickerProps,
  QuarterPicker,
  RangePickerProps,
  TimePicker,
  WeekPicker,
  YearPicker,
} from './type';

export type MixinHOCProps = Omit<DatePickerProps | RangePickerProps | QuarterPicker, 'children'> & {
  theme?: Theme;
  popupClassName?: string | undefined;
  className?: string;
  children: (classes: string, popupClassName: string | undefined) => JSX.Element;
};

export function MixHOC(props: MixinHOCProps) {
  const { className, theme, popupClassName, children } = props;
  const { classes, themeConfig, token, prefix, tokenExt } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyle,
      zeus: customStyle,
    },
  });
  const { themeExt } = useContext(AntdExtGlobalContext);
  const finTheme = theme || themeExt;

  const _popupClassName = useMemo(() => {
    return {
      hermes: classNames(customPopupStyle(token, prefix, tokenExt), popupClassName),
      zeus: classNames(customPopupStyle(token, prefix, tokenExt), popupClassName),
      default: popupClassName,
    }[finTheme];
  }, [token, prefix, popupClassName, finTheme, tokenExt]);

  return (
    <ThemeWrapper theme={themeConfig} type="DatePicker">
      {children(classes, _popupClassName)}
    </ThemeWrapper>
  );
}

export type MixinDatePickerExtProps = Omit<DatePickerProps, 'children'> & {
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

export type MixinRangePickerExtProps = Omit<RangePickerProps, 'children'> & {
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

export type MixinQuarterPickerExtProps = Omit<QuarterPicker, 'children'> & {
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

export type MixinYearPickerExtProps = Omit<YearPicker, 'children'> & {
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

export type MixinMonthPickerExtProps = Omit<MonthPickerProps, 'children'> & {
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

export type MixinWeekPickerExtProps = Omit<WeekPicker, 'children'> & {
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

export type MixinTimePickerExtProps = Omit<TimePicker, 'children'> & {
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

export type MixinDatePickerOutLineExtProps = Omit<DatePickerOutLineExtProps, 'children'> & {
  theme?: Theme;
};

export function MixinDatePickerOutLine(props: MixinDatePickerOutLineExtProps) {
  return (
    <MixHOC {...props}>
      {(classes, _popupClassName) => {
        return (
          <DatePickerOutLineExt {...props} className={classes} popupClassName={_popupClassName} />
        );
      }}
    </MixHOC>
  );
}

export type MixinRangePickerOutLineExtProps = Omit<RangePickerOutLineExtProps, 'children'> & {
  theme?: Theme;
};

export function MixinRangePickerOutLine(props: MixinRangePickerOutLineExtProps) {
  return (
    <MixHOC {...props}>
      {(classes, _popupClassName) => {
        return (
          <RangePickerOutLineExt {...props} className={classes} popupClassName={_popupClassName} />
        );
      }}
    </MixHOC>
  );
}
