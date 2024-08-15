import { notification } from 'antd';
import type { ArgsProps } from 'antd/es/notification';
import type { GlobalConfigProps, NotificationConfig } from 'antd/es/notification/interface';
import classNames from 'classnames';
import type { MouseEventHandler } from 'react';
import React from 'react';
import error from '../assets/img/error.svg';
import info from '../assets/img/info.svg';
import success from '../assets/img/success.svg';
import warning from '../assets/img/warning.svg';
import ButtonExt from '../ButtonExt/ButtonExt';
import { globalConfig } from '../ConfigProviderExt/ConfigProviderExt';
import type { Theme } from '../ConfigProviderExt/context';
import { styles } from './styles';

interface ArgsPropsExt extends ArgsProps {
  theme?: 'default' | 'hermes' | 'zeus';
  needBtn?: boolean;
}

function BtnIKnow(props: { onClick?: MouseEventHandler }) {
  const { onClick } = props;
  return (
    <ButtonExt type="link" style={{ padding: 0, fontSize: 12, height: 22 }} onClick={onClick}>
      我知道了
    </ButtonExt>
  );
}

const notificationExt = (() => {
  let key = 0;
  let g_theme = 'hermes';

  function setTheme(p: Theme) {
    g_theme = p;
  }

  const api = (notificationInst: any, type: 'success' | 'error' | 'info' | 'warning' | 'open') => {
    const global = globalConfig();

    const icon = {
      success: <img className="icon" src={success} />,
      error: <img className="icon" src={error} />,
      info: <img className="icon" src={info} />,
      warning: <img className="icon" src={warning} />,
    }[type];

    return (config: ArgsPropsExt) => {
      const { theme, btn, needBtn, className, ...restProps } = config;

      const hasBtn = needBtn || btn !== undefined;

      const baseConfig = {
        hermes: {
          icon,
          closeIcon: null,
          className: classNames(className, styles(global.getPrefixCls()), {
            'not-description': !restProps.description,
          }),
          style: { width: hasBtn ? 360 : 300 },
          duration: hasBtn ? 0 : 3,
          btn: ((k: number) =>
            btn !== undefined ? (
              btn
            ) : needBtn ? (
              <BtnIKnow onClick={() => notificationInst.destroy(`${k}`)} />
            ) : undefined)(key),
        },
        zeus: {
          icon,
          closeIcon: null,
          className: classNames(className, styles(global.getPrefixCls()), {
            'not-description': !restProps.description,
          }),
          style: { width: hasBtn ? 360 : 300 },
          duration: hasBtn ? 0 : 3,
          btn: ((k: number) =>
            btn !== undefined ? (
              btn
            ) : needBtn ? (
              <BtnIKnow onClick={() => notificationInst.destroy(`${k}`)} />
            ) : undefined)(key),
        },
        default: {},
      }[theme || global.getThemeExt() || g_theme];

      notificationInst[type]({
        key: `${key++}`,
        ...baseConfig,
        ...restProps,
      });
    };
  };

  return {
    success: api(notification, 'success'),
    error: api(notification, 'error'),
    info: api(notification, 'info'),
    warning: api(notification, 'warning'),
    open: api(notification, 'open'),
    destroy: (k?: string) => notification.destroy(k),
    useNotification: (notificationConfig?: NotificationConfig) => {
      const [apiNotification, contextHolder] = notification.useNotification(notificationConfig);

      const instance = {
        success: api(apiNotification, 'success'),
        error: api(apiNotification, 'error'),
        info: api(apiNotification, 'info'),
        warning: api(apiNotification, 'warning'),
        open: api(apiNotification, 'open'),
        destroy: (k?: React.Key) => apiNotification.destroy(k),
      };

      return [instance, contextHolder] as readonly [
        typeof instance,
        React.ReactElement<any, string | React.JSXElementConstructor<any>>,
      ];
    },
    config: (config: GlobalConfigProps) => {
      notification.config(config);
    },
    setTheme,
  };
})();

export default notificationExt;
