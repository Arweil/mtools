import { ButtonExt, ConfigProviderExt, notificationExt, Space } from '@m-tools/antd-ext';
import React, { useCallback } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error' | 'open';

let num = 0;

const App: React.FC = () => {
  const [api, contextHolder] = notificationExt.useNotification();

  const openNotification = useCallback(
    (type: NotificationType) => {
      api[type]({
        message: `${type}提示`,
        description: `${type}提示副标题文案`,
        needBtn: false,
      });
    },
    [api],
  );

  const openNotificationLongText = useCallback(() => {
    api.success({
      message: `提示提示提示提示提示提示提示提示`,
      description: `提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案`,
      needBtn: false,
    });
  }, [api]);

  const openNotificationBtn = useCallback(() => {
    num++;

    api.success({
      message: `成功提示`,
      description: `成功提示副标题文案${num}`,
      needBtn: true,
    });
  }, [api]);

  return (
    <>
      {contextHolder}
      <Space>
        <ButtonExt onClick={() => openNotification('success')}>Success</ButtonExt>
        <ButtonExt onClick={() => openNotification('info')}>Info</ButtonExt>
        <ButtonExt onClick={() => openNotification('warning')}>Warning</ButtonExt>
        <ButtonExt onClick={() => openNotification('error')}>Error</ButtonExt>
        <ButtonExt onClick={() => openNotification('open')}>Open</ButtonExt>
        <ButtonExt onClick={openNotificationLongText}>长文案</ButtonExt>
        <ButtonExt onClick={openNotificationBtn}>有按钮</ButtonExt>
      </Space>
    </>
  );
};

export default () => (
  <ConfigProviderExt themeExt="hermes" prefixCls="test">
    <App />
  </ConfigProviderExt>
);
