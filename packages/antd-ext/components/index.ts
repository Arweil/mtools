import en_US from 'antd/es/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import ButtonExt, { BaseButtonExt } from './ButtonExt';
import { BaseCascaderExt } from './CascaderExt';
import ConfigProviderExt from './ConfigProviderExt';
import type { Theme } from './ConfigProviderExt/context';
import DatePickerExt, {
  MixinDatePickerOutLine as DatePickerOutLineExt,
  MixinRangePickerOutLine as RangePickerOutLineExt,
} from './DatePickerExt';
import DrawerExt, { BaseDrawerExt } from './DrawerExt';
// import ProSearchTable from './ProSearchTable';
import { default as FormItemExt } from './FormItemExt';
import {
  BaseInputExt,
  MixinInputExt as InputExt,
  MixinInputOutLineExt as InputOutLineExt,
} from './InputExt';
import LayoutExt, { BaseLayoutExt } from './LayoutExt';
import ModalExt from './ModalExt';
import notificationExt from './Notification';
import { BaseProInputNumber, ProInputNumber, ProInputNumberOutLine } from './ProInputNumber';
import RadioGroupExt from './RadioGroupExt';
import {
  BaseRangeNumberExt,
  MixinRangeNumberExt as RangeNumberExt,
  MixinRangeNumberOutLineExt as RangeNumberOutLineExt,
} from './RangeNumberExt';
import {
  MixinCascaderExt as CascaderExt,
  MixinCascaderOutLineExt as CascaderOutLineExt,
} from './SelCascader';
import {
  BaseSelectExt,
  MixinSelectExt as SelectExt,
  MixinSelectOutLineExt as SelectOutLineExt,
} from './SelectExt';
import TableExt, { BaseTableExt } from './TableExt';
import { BaseTreeExt, default as TreeExt } from './TreeExt';
import UploadExt, { BaseUploadExt } from './UploadExt';

export * from 'antd';
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
  BaseUploadExt,
  ConfigProviderExt,
  DatePickerExt,
  DrawerExt,
  InputExt,
  TableExt,
  BaseTreeExt,
  TreeExt,
  SelectExt,
  RangeNumberExt,
  LayoutExt,
  RadioGroupExt,
  FormItemExt,
  ProInputNumber,
  // ProSearchTable,
  InputOutLineExt,
  DatePickerOutLineExt,
  RangePickerOutLineExt,
  SelectOutLineExt,
  RangeNumberOutLineExt,
  ProInputNumberOutLine,
  UploadExt,
  CascaderExt,
  CascaderOutLineExt,
  ModalExt,
  Theme,
  notificationExt,
};

export const locale = {
  zh_CN,
  en_US,
};
