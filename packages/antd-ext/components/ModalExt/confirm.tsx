import { Modal } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { globalConfig } from '../ConfigProviderExt/ConfigProviderExt';
import { ICONMAP } from './config';
import { ThemeZeus } from './ThemeZeus';
import type { ModalFuncPropsExt } from './types';

export default function confirm(config: ModalFuncPropsExt) {
  const { icon, type = 'confirm', title, content, className, backgroundImg, ...rest } = config;
  const global = globalConfig();

  if (global.getThemeExt() === 'zeus') {
    const _content = (
      <>
        {backgroundImg && <div className="background-img">{backgroundImg}</div>}
        {icon || (ICONMAP[type] && <img className="icon" src={ICONMAP[type]} />)}
        <div className="title">{title}</div>
        <div className="content">{content}</div>
      </>
    );

    return Modal[type]({
      icon: null,
      className: classNames(ThemeZeus(undefined, global.getPrefixCls(), undefined), className),
      content: _content,
      ...rest,
    });
  }

  return Modal.confirm(config);
}
