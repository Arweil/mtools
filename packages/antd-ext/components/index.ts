import ButtonExt, { BaseButtonExt } from './ButtonExt';
import ConfigProviderExt from './ConfigProviderExt';
import TableExt, { BaseTableExt } from './TableExt';
import {
  MixinInputExt as InputExt,
  MixinInputOutLineExt as InputOutLineExt,
  BaseInputExt,
} from './InputExt';
import { BaseProInputNumber, ProInputNumberOutLine, ProInputNumber } from './ProInputNumber';
import {
  MixinSelectExt as SelectExt,
  MixinSelectOutLineExt as SelectOutLineExt,
  BaseSelectExt,
} from './SelectExt';
import DrawerExt, { BaseDrawerExt } from './DrawerExt';
import {
  MixinRangeNumberExt as RangeNumberExt,
  MixinRangeNumberOutLineExt as RangeNumberOutLineExt,
  BaseRangeNumberExt,
} from './RangeNumberExt';
import LayoutExt, { BaseLayoutExt } from './LayoutExt';
import DatePickerExt from './DatePickerExt';
import { BaseCascaderExt } from './CascaderExt';

export * from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import type { Theme } from './ConfigProviderExt/context';

export {
  BaseButtonExt,
  BaseTableExt,
  BaseInputExt,
  BaseProInputNumber,
  BaseSelectExt,
  BaseDrawerExt,
  BaseRangeNumberExt,
  BaseLayoutExt,
  BaseCascaderExt,
  ButtonExt,
  ConfigProviderExt,
  TableExt,
  InputExt,
  InputOutLineExt,
  ProInputNumberOutLine,
  SelectExt,
  SelectOutLineExt,
  DrawerExt,
  RangeNumberExt,
  RangeNumberOutLineExt,
  LayoutExt,
  DatePickerExt,
  ProInputNumber,
  Theme,
};

export const locale = {
  zh_CN,
  en_US,
};
