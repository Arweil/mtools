import type {
  RangePickerProps as BaseRangePickerProps,
  PickerProps,
  PickerLocale,
  PickerTimeProps,
} from 'antd/es/date-picker/generatePicker';
import type { ButtonSize } from 'antd/es/button';
import type { Dayjs } from 'dayjs';

export type DatePickerProps = PickerProps<Dayjs> & {
  status?: '' | 'error' | 'warning' | undefined;
  hashId?: string | undefined;
  popupClassName?: string | undefined;
  rootClassName?: string | undefined;
};

export type RangePickerProps = BaseRangePickerProps<Dayjs> & {
  dropdownClassName?: string | undefined;
  popupClassName?: string | undefined;
};
export type MonthPickerProps = Omit<
  PickerProps<Dayjs> & {
    status?: '' | 'warning' | 'error' | undefined;
    hashId?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
  },
  'picker'
>;
export type QuarterPicker = Omit<
  Omit<PickerTimeProps<Dayjs>, 'locale' | 'generateConfig' | 'hideHeader' | 'components'> & {
    locale?: PickerLocale | undefined;
    size?: ButtonSize;
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | undefined;
    bordered?: boolean | undefined;
    status?: '' | 'warning' | 'error' | undefined;
  } & {
    status?: '' | 'warning' | 'error' | undefined;
    hashId?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
  },
  'picker'
>;
export type YearPicker = Omit<
  PickerProps<Dayjs> & {
    status?: '' | 'warning' | 'error' | undefined;
    hashId?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
  },
  'picker'
>;
export type WeekPicker = Omit<
  PickerProps<Dayjs> & {
    status?: '' | 'warning' | 'error' | undefined;
    hashId?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
  },
  'picker'
>;
export type TimePicker = Omit<
  Omit<PickerTimeProps<Dayjs>, 'locale' | 'generateConfig' | 'hideHeader' | 'components'> & {
    locale?: PickerLocale | undefined;
    size?: ButtonSize;
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | undefined;
    bordered?: boolean | undefined;
    status?: '' | 'warning' | 'error' | undefined;
  } & {
    status?: '' | 'warning' | 'error' | undefined;
    hashId?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
  },
  'picker'
>;
