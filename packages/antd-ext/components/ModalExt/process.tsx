import React from 'react';
import { debounce } from '../utils/useDebounceFn';
import { ICONMAP } from './config';
import type { ModalFuncPropsExt } from './types';

interface ProcessProps extends ModalFuncPropsExt {
  prefixCls?: string;
  mtPrefixCls?: string;
}

/**
 * config配置的加工函数
 * @param config
 * @returns
 */
export default function process(config: ProcessProps): ModalFuncPropsExt {
  const {
    icon,
    type = 'confirm',
    title,
    content,
    backgroundImg,
    prefixCls,
    mtPrefixCls,
    onOk,
    ...rest
  } = config;

  const _content = (
    <>
      {backgroundImg && (
        <div className={`${prefixCls}-${mtPrefixCls}-background-img`}>{backgroundImg}</div>
      )}
      {icon === undefined
        ? ICONMAP[type] && (
            <img className={`${prefixCls}-${mtPrefixCls}-icon`} src={ICONMAP[type]} />
          )
        : icon}
      <div className={`${prefixCls}-${mtPrefixCls}-title`}>{title}</div>
      {content && <div className={`${prefixCls}-${mtPrefixCls}-content`}>{content}</div>}
    </>
  );

  const _onOk = debounce(() => {
    onOk?.();
  }, 300);

  return {
    type,
    content: _content,
    onOk: _onOk,
    ...rest,
  };
}
