import { Modal } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { useMapTheme } from '../utils';
import { ICONMAP } from './config';
import { ThemeZeus } from './ThemeZeus';
import type { HookAPIExt, ModalFuncPropsExt, ModalReturnType } from './types';

export default function useModal(): [HookAPIExt, ModalReturnType[1]] {
  const [api, contextHolder] = Modal.useModal();
  const { classes, theme, prefix } = useMapTheme({
    emotioncss: { zeus: ThemeZeus },
  });

  const confirm = (config: ModalFuncPropsExt) => {
    if (theme !== 'zeus') return api.confirm(config);

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
  };

  const fn: HookAPIExt = {
    confirm: config => confirm(config),
    error: config => confirm({ ...config, type: 'error' }),
    info: config => confirm({ ...config, type: 'info' }),
    success: config => confirm({ ...config, type: 'success' }),
    warning: config => confirm({ ...config, type: 'warning' }),
  };

  return [fn, contextHolder];
}
