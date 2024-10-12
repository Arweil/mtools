import { Modal } from 'antd';
import classNames from 'classnames';
import { globalConfig } from '../ConfigProviderExt/ConfigProviderExt';
import { mtPrefixCls } from '../utils/config';
import process from './process';
import { styles } from './styles';
import type { ModalFuncPropsExt } from './types';

export default function modal(config: ModalFuncPropsExt) {
  const global = globalConfig();
  const prefix = global.getPrefixCls();
  const {
    type = 'confirm',
    content,
    className,
    ...rest
  } = process({ ...config, prefixCls: prefix, mtPrefixCls });

  if (['zeus', 'hermes'].includes(global.getThemeExt())) {
    return Modal[type]({
      icon: null,
      className: classNames(styles(undefined, global.getPrefixCls(), undefined), className),
      content,
      ...rest,
    });
  }

  return Modal[type](config);
}
