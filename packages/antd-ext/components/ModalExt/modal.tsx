import { Modal } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { globalConfig } from '../ConfigProviderExt/ConfigProviderExt';
import { ICONMAP } from './config';
import { ThemeZeus } from './ThemeZeus';
import type { ModalFuncPropsExt } from './types';

export default function modal(config: ModalFuncPropsExt) {
  const { icon, type = 'confirm', title, content, className, backgroundImg, ...rest } = config;
  const global = globalConfig();
  const prefix = global.getPrefixCls();

  if (global.getThemeExt() === 'zeus') {
    const _content = (
      <>
        <>
          {backgroundImg && <div className={`${prefix}-background-img`}>{backgroundImg}</div>}
          {icon === undefined
            ? ICONMAP[type] && <img className={`${prefix}-icon`} src={ICONMAP[type]} />
            : icon}
          <div className={`${prefix}-title`}>{title}</div>
          <div className={`${prefix}-content`}>{content}</div>
        </>
      </>
    );

    return Modal[type]({
      icon: null,
      className: classNames(ThemeZeus(undefined, global.getPrefixCls(), undefined), className),
      content: _content,
      ...rest,
    });
  }

  return Modal[type](config);
}
