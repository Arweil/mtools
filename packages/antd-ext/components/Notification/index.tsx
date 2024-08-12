import { css as reactcss, Global } from '@emotion/react';
import { notification } from 'antd';
import type { ArgsProps } from 'antd/es/notification';
import type { GlobalConfigProps, NotificationConfig } from 'antd/es/notification/interface';
import classNames from 'classnames';
import type { MouseEventHandler } from 'react';
import React from 'react';
import error from '../../assets/img/error.svg';
import info from '../../assets/img/info.svg';
import success from '../../assets/img/success.svg';
import warning from '../../assets/img/warning.svg';
import ButtonExt from '../ButtonExt/ButtonExt';
import type { Theme } from '../ConfigProviderExt/context';
import type { ThemeColor } from '../theme/type';

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

                .not-description {
                  padding: 14px;
                  .${prefixCls}-notification-notice-with-icon {
                   .${prefixCls}-notification-notice-icon {
                      .icon {
                        margin: 4px;
                        height: 16px;
                        line-height: 0;
                      }
                    }

                    .${prefixCls}-notification-notice-message {
                      margin-inline-start: 26px;
                      padding-top: 0;
                      line-height: 24px;
                    }
                    .${prefixCls}-notification-notice-description {
                      display: none;
                    }
                  }
                }

                .${prefixCls}-notification-notice-with-icon {
                  line-height: 0;
                  .${prefixCls}-notification-notice-icon {
                    .icon {
                      margin: 6px;
                      height: 40px;
                    }
                  }
                  .${prefixCls}-notification-notice-message {
                    margin-bottom: 0;
                    padding-top: 5px;
                    font-weight: bold;
                    font-size: 15px;
                    margin-inline-start: ${52 + 12}px;
                    line-height: 21px;
                  }
              
                  .${prefixCls}-notification-notice-description {
                    padding: 6px 0 3px;
                    color: #666666;
                    font-size: 12px;
                    margin-inline-start: ${52 + 12}px;
                    line-height: 17px;
                  }
                }
              }
              .${prefixCls}-notification-notice-content {
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
        className: classNames(className, { 'not-description': !restProps.description }),
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
