import { css as reactcss, Global } from '@emotion/react';
import { notification } from 'antd';
import type { ArgsProps } from 'antd/es/notification';
import type { GlobalConfigProps, NotificationConfig } from 'antd/es/notification/interface';
import type { MouseEventHandler } from 'react';
import React from 'react';
import ButtonExt from '../ButtonExt/ButtonExt';
import type { Theme } from '../ConfigProviderExt/context';
import type { ThemeColor } from '../theme/type';
import error from './img/error.svg';
import info from './img/info.svg';
import success from './img/success.svg';
import warning from './img/warning.svg';

interface ArgsPropsExt extends ArgsProps {
  theme?: 'default' | 'hermes' | 'zeus';
  needBtn?: boolean;
}

export function NotificationGlobalStyle(props: {
  prefixCls: string;
  theme: Theme;
  tokenExt: Partial<ThemeColor>;
}): JSX.Element {
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

                .${prefixCls}-notification-notice {
                  padding: 12px 20px;
                }

                .${prefixCls}-notification-notice-with-icon {
                  .${prefixCls}-notification-notice-message {
                    margin-bottom: 4px;
                    padding-top: 2px;
                    font-weight: 500;
                    font-size: 15px;
                    margin-inline-start: ${52 + 12}px;
                  }
              
                  .${prefixCls}-notification-notice-description {
                    color: #666666;
                    font-size: 12px;
                    margin-inline-start: ${52 + 12}px;
                  }
                }
              }
              .${prefixCls}-notification-notice-content {
                min-height: 52px;
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

  const api = (notificationInst: any, type: 'success' | 'error' | 'info' | 'warning' | 'open') => {
    const icon = {
      success: <img src={success} style={{ width: 52 }} />,
      error: <img src={error} style={{ width: 52 }} />,
      info: <img src={info} style={{ width: 52 }} />,
      warning: <img src={warning} style={{ width: 52 }} />,
    }[type];

    return (config: ArgsPropsExt) => {
      const { theme, btn, needBtn, ...restProps } = config;
      console.log(config);

      const hasBtn = needBtn || btn !== undefined;

      const baseConfig = {
        hermes: {
          icon,
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
