import { Button, ConfigProviderExt, Divider, ModalExt, Space } from '@m-tools/antd-ext';
import type { ModalFuncPropsExt } from '@m-tools/antd-ext/ModalExt/useModal';
import React, { useState } from 'react';
import backgroundImg from './background.png';
import icon from './icon.png';

const App = () => {
  const [open, setOpen] = useState(false);
  const [api, context] = ModalExt.useModal();

  const openModal = (type: ModalFuncPropsExt['type']) => {
    api.confirm({
      title: '这是一个title',
      type,
      content: '这是副文案描述',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        console.log('ok');
      },
    });
  };

  const openCustomModal = (type: ModalFuncPropsExt['type']) => {
    api.confirm({
      title: '这是一个title',
      type,
      content: '这是副文案描述',
      okText: '确认',
      cancelText: '取消',
      icon: <img src={icon} />,
      backgroundImg: <img src={backgroundImg} alt="" />,
      onOk: () => {
        console.log('ok');
      },
    });
  };

  return (
    <>
      {context}
      <h4>基本用法</h4>
      <Space>
        <Button onClick={() => openModal('confirm')}>Confirm</Button>
        <Button onClick={() => openModal('info')}>Info</Button>
        <Button onClick={() => openModal('success')}>Success</Button>
        <Button onClick={() => openModal('error')}>Error</Button>
        <Button onClick={() => openModal('warning')}>Warning</Button>
      </Space>
      <Divider />
      <h4>自定义icon和背景</h4>
      <Space>
        <Button onClick={() => openCustomModal('warning')}>Custom</Button>
      </Space>
      <ModalExt open={open} onCancel={() => setOpen(false)} />
    </>
  );
};

export default () => (
  <ConfigProviderExt themeExt="zeus">
    <App />
  </ConfigProviderExt>
);
