import { ButtonExt, notificationExt, Space } from '@m-tools/antd-ext';
import React, { useCallback } from 'react';
import successIcon from './success.png';

type NotificationType = 'success' | 'info' | 'warning' | 'error' | 'open';

let num = 0;

export default function App() {
  const openNotification = useCallback((type: NotificationType) => {
    notificationExt[type]({
      message: `${type}提示`,
      description: `${type}提示副标题文案`,
      needBtn: false,
    });
  }, []);

  const openNotificationLongText = useCallback(() => {
    notificationExt.success({
      message: `提示提示提示提示提示提示提示提示`,
      description: `提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案`,
      needBtn: false,
    });
  }, []);

  const openNotificationBtn = useCallback(() => {
    num++;

    notificationExt.success({
      message: `成功提示`,
      description: `成功提示副标题文案${num}`,
      needBtn: true,
      className: 'a',
    });
  }, []);

  const openNotificationWithIcon = useCallback(() => {
    notificationExt.success({
      message: `提示提示提示提示提示提示提示提示`,
      description: `提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案提示副标题文案`,
      icon: <img src={successIcon} style={{ width: 52 }} />,
      needBtn: false,
    });
  }, []);

  return (
    <Space>
      <ButtonExt onClick={() => openNotification('success')}>Success</ButtonExt>
      <ButtonExt onClick={() => openNotification('info')}>Info</ButtonExt>
      <ButtonExt onClick={() => openNotification('warning')}>Warning</ButtonExt>
      <ButtonExt onClick={() => openNotification('error')}>Error</ButtonExt>
      <ButtonExt onClick={() => openNotification('open')}>Open</ButtonExt>
      <ButtonExt onClick={openNotificationLongText}>长文案</ButtonExt>
      <ButtonExt onClick={openNotificationBtn}>有按钮</ButtonExt>
      <ButtonExt onClick={openNotificationWithIcon}>Icon更换</ButtonExt>
    </Space>
  );
}
