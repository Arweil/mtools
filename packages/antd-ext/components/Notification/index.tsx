import { css } from '@emotion/css';
import { css as reactcss, Global } from '@emotion/react';
import { notification } from 'antd';
import { globalConfig } from 'antd/es/config-provider';
import type { ArgsProps } from 'antd/es/notification';
import type { GlobalConfigProps, NotificationConfig } from 'antd/es/notification/interface';
import classNames from 'classnames';
import type { MouseEventHandler } from 'react';
import React from 'react';
import ButtonExt from '../ButtonExt/ButtonExt';
import type { Theme } from '../ConfigProviderExt/context';
import { usePrefixCls } from '../utils';
import error from './img/error.svg';
import info from './img/info.svg';
import success from './img/success.svg';
import warning from './img/warning.svg';

export const notification_hermes = (prefixCls: string) => css`
  padding: 12px 20px !important;

  .${prefixCls}-notification-notice-content {
    min-height: 52px !important;
  }

  .${prefixCls}-notification-notice-with-icon {
    .${prefixCls}-notification-notice-message {
      margin-bottom: 4px !important;
      padding-top: 2px;
      font-weight: 500;
      font-size: 15px !important;
      margin-inline-start: ${52 + 12}px !important;
    }

    .${prefixCls}-notification-notice-description {
      color: #666666 !important;
      font-size: 12px !important;
      margin-inline-start: ${52 + 12}px !important;
    }
  }
`;

const notification_zeus = css``;

interface ArgsPropsExt extends ArgsProps {
  theme?: 'default' | 'hermes' | 'zeus';
  needBtn?: boolean;
}

export function NotificationGlobalStyle(props: { prefixCls: string; theme: Theme }): JSX.Element {
  const { prefixCls, theme } = props;

  switch (theme) {
    case 'hermes':
    case 'zeus':
      return (
        <Global
          styles={reactcss`
            .${prefixCls}-notification {
              .${prefixCls}-notification-notice-wrapper {
                border-radius: 12px;
              }
            }
          `}
        />
      );
    case 'default':
      return null;
  }
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

  const api = (
    notificationInst: any,
    type: 'success' | 'error' | 'info' | 'warning' | 'open',
    prefixCls?: string,
  ) => {
    const icon = {
      success: <img src={success} style={{ width: 52 }} />,
      error: <img src={error} style={{ width: 52 }} />,
      info: <img src={info} style={{ width: 52 }} />,
      warning: <img src={warning} style={{ width: 52 }} />,
    }[type];

    return (config: ArgsPropsExt) => {
      const { theme, btn, needBtn, className, ...restProps } = config;
      const global = globalConfig();

      const hasBtn = needBtn || btn !== undefined;

      const baseConfig = {
        hermes: {
          icon,
          className: classNames(
            notification_hermes(prefixCls || global.getRootPrefixCls()),
            className,
          ),
          closeIcon: null,
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
          className: classNames(notification_zeus, className),
          closeIcon: null,
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
      }[theme || g_theme];

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
      const { prefixCls } = usePrefixCls();

      const instance = {
        success: api(apiNotification, 'success', prefixCls),
        error: api(apiNotification, 'error', prefixCls),
        info: api(apiNotification, 'info', prefixCls),
        warning: api(apiNotification, 'warning', prefixCls),
        open: api(apiNotification, 'open', prefixCls),
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
    api,
    setTheme,
  };
})();

export default notificationExt;
