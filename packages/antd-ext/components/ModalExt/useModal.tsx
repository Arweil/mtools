import { Modal } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { useMapTheme } from '../utils';
import { ICONMAP } from './config';
import { styles } from './styles';
import type { HookAPIExt, ModalFuncPropsExt, ModalReturnType } from './types';

export default function useModal(): [HookAPIExt, ModalReturnType[1]] {
  const [api, contextHolder] = Modal.useModal();
  const { classes, theme, prefix } = useMapTheme({
    emotioncss: { zeus: styles, hermes: styles },
  });

  const modal = (config: ModalFuncPropsExt) => {
    if (['zeus', 'hermes'].includes(theme)) {
      const { icon, type = 'confirm', title, content, className, backgroundImg, ...rest } = config;

      const _content = (
        <>
          {backgroundImg && <div className={`${prefix}-background-img`}>{backgroundImg}</div>}
          {icon === undefined
            ? ICONMAP[type] && <img className={`${prefix}-icon`} src={ICONMAP[type]} />
            : icon}
          <div className={`${prefix}-title`}>{title}</div>
          <div className={`${prefix}-content`}>{content}</div>
        </>
      );

      return api[type]({
        icon: null,
        className: classNames(classes, className),
        content: _content,
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
