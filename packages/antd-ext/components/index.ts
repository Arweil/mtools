import ButtonExt from './ButtonExt';
import ConfigProviderExt from './ConfigProviderExt';
import TableExt from './TableExt';
import { MixinInputExt as InputExt, MixinInputOutLineExt as InputOutLineExt } from './InputExt';
import { MixinSelectExt as SelectExt, MixinSelectOutLineExt as SelectOutLineExt } from './SelectExt';
export * from 'antd';
import zh_CN from 'antd/locale/zh_CN';
import type { Theme } from './ConfigProviderExt/context';

export {
  ButtonExt,
  ConfigProviderExt,
  TableExt,
  InputExt,
  InputOutLineExt,
  SelectExt,
  SelectOutLineExt,

  Theme,
}

export const locale = {
  zh_CN,
}
