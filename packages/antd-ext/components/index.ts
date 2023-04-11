import ButtonExt from './ButtonExt';
import ConfigProviderExt from './ConfigProviderExt';
import TableExt from './TableExt';
import { MixinInputExt as InputExt, MixinInputOutLineExt as InputOutLineExt } from './InputExt';
import { MixinSelectExt as SelectExt, MixinSelectOutLineExt as SelectOutLineExt } from './SelectExt';
import DrawerExt from './DrawerExt';
import { MixinRangeNumberExt as RangeNumberExt, MixinRangeNumberOutLineExt as RangeNumberOutLineExt } from './RangeNumberExt';
import LayoutExt from './LayoutExt';
export * from 'antd';
import zh_CN from 'antd/locale/zh_CN';
import en_US from 'antd/locale/en_US';
import type { Theme } from './ConfigProviderExt/context';

export {
  ButtonExt,
  ConfigProviderExt,
  TableExt,
  InputExt,
  InputOutLineExt,
  SelectExt,
  SelectOutLineExt,
  DrawerExt,
  RangeNumberExt,
  RangeNumberOutLineExt,
  LayoutExt,

  Theme,
}

export const locale = {
  zh_CN,
  en_US,
}
