import type { ModalFuncProps } from 'antd';
import { Modal } from 'antd';
import type { HookAPI } from 'antd/es/modal/useModal';
import classNames from 'classnames';
import React from 'react';
import error from '../../assets/img/error.svg';
import info from '../../assets/img/info.svg';
import success from '../../assets/img/success.svg';
import warning from '../../assets/img/warning.svg';
import { useMapTheme } from '../utils';
import { ThemeZeus } from './ThemeZeus';

type ModalReturnType = ReturnType<(typeof Modal)['useModal']>;

export interface ModalFuncPropsExt extends ModalFuncProps {
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm';
  backgroundImg?: React.ReactNode;
}

interface HookAPIExt extends Omit<HookAPI, 'confirm'> {
  confirm: (config: ModalFuncPropsExt) => void;
}

const ICONMAP = {
  info,
  success,
  error,
  warning,
};

export default function useModal(): [HookAPIExt, ModalReturnType[1]] {
  const [api, contextHolder] = Modal.useModal();
  const { classes, theme } = useMapTheme({
    emotioncss: { zeus: ThemeZeus },
  });

  const confirm = (config: ModalFuncPropsExt) => {
    if (theme !== 'zeus') return api.confirm(config);

    const { icon, type = 'confirm', title, content, className, backgroundImg, ...rest } = config;

    return api.confirm({
      icon: null,
      className: classNames(classes, className),
      content: (
        <>
          {backgroundImg && <div className="background-img">{backgroundImg}</div>}
          {icon || (ICONMAP[type] && <img className="icon" src={ICONMAP[type]} />)}
          <div className="title">{title}</div>
          <div className="content">{content}</div>
        </>
      ),
      ...rest,
    });
  };

  const fn: HookAPIExt = {
    ...api,
    confirm: config => confirm(config),
  };

  return [fn, contextHolder];
}
