import { Button, ConfigProviderExt, ModalExt, Space } from '@m-tools/antd-ext';
import React from 'react';
import backgroundImg from './background.png';
import icon from './icon.png';

const App = () => {
  const [api, context] = ModalExt.useModal();

  const openCustomModal = () => {
    api.confirm({
      title: '这是一个title',
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
      <h4>自定义icon和背景</h4>
      <Space>
        <Button onClick={() => openCustomModal()}>Custom</Button>
      </Space>
    </>
  );
};

export default () => (
  <ConfigProviderExt themeExt="zeus">
    <App />
  </ConfigProviderExt>
);
