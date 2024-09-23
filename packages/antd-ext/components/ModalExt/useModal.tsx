import { Modal } from 'antd';
import classNames from 'classnames';
import { useMapTheme, usePrefixCls } from '../utils';
import process from './process';
import { styles } from './styles';
import type { HookAPIExt, ModalFuncPropsExt, ModalReturnType } from './types';

export default function useModal(): [HookAPIExt, ModalReturnType[1]] {
  const [api, contextHolder] = Modal.useModal();
  const { classes, theme } = useMapTheme({
    emotioncss: { zeus: styles, hermes: styles },
  });
  const { prefixCls, mtPrefixCls } = usePrefixCls();

  const modal = (config: ModalFuncPropsExt) => {
    if (['zeus', 'hermes'].includes(theme)) {
      const {
        type = 'confirm',
        content,
        className,
        ...rest
      } = process({ ...config, prefixCls, mtPrefixCls });

      return api[type]({
        icon: null,
        className: classNames(classes, className),
        content,
        ...rest,
      });
    }

    return api[config.type || 'confirm'](config);
  };

  const fn: HookAPIExt = {
    confirm: config => modal(config),
    error: config => modal({ ...config, type: 'error' }),
    info: config => modal({ ...config, type: 'info' }),
    success: config => modal({ ...config, type: 'success' }),
    warning: config => modal({ ...config, type: 'warning' }),
  };

  return [fn, contextHolder];
}
