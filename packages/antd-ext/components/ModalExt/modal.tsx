import { Modal } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { globalConfig } from '../ConfigProviderExt/ConfigProviderExt';
import { mtPrefixCls } from '../utils/config';
import { ICONMAP } from './config';
import { styles } from './styles';
import type { ModalFuncPropsExt } from './types';

export default function modal(config: ModalFuncPropsExt) {
  const { icon, type = 'confirm', title, content, className, backgroundImg, ...rest } = config;
  const global = globalConfig();
  const prefix = global.getPrefixCls();

  if (['zeus', 'hermes'].includes(global.getThemeExt())) {
    const _content = (
      <>
        <>
          {backgroundImg && (
            <div className={`${prefix}-${mtPrefixCls}-background-img`}>{backgroundImg}</div>
          )}
          {icon === undefined
            ? ICONMAP[type] && (
                <img className={`${prefix}-${mtPrefixCls}-icon`} src={ICONMAP[type]} />
              )
            : icon}
          <div className={`${prefix}-${mtPrefixCls}-title`}>{title}</div>
          {content && <div className={`${prefix}-${mtPrefixCls}-content`}>{content}</div>}
        </>
      </>
    );

    return Modal[type]({
      icon: null,
      className: classNames(styles(undefined, global.getPrefixCls(), undefined), className),
      content: _content,
      ...rest,
    });
  }

  return Modal[type](config);
}
