import { Button, ConfigProviderExt, ModalExt, Space } from '@m-tools/antd-ext';
import React from 'react';

const App = () => {
  const [api, context] = ModalExt.useModal();

  const confirm = () => {
    api.confirm({
      title: '这是一个title',
      content: '这是副文案描述',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        console.log('ok');
      },
    });
  };

  const info = () => {
    api.info({
      title: '这是一个info modal',
      content: '这是副文案描述',
    });
  };

  const success = () => {
    api.success({
      title: '这是一个success modal',
      content: '这是副文案描述',
    });
  };

  const error = () => {
    api.error({
      title: '这是一个error modal',
      content: '这是副文案描述',
    });
  };

  const warning = () => {
    api.warning({
      title: '这是一个warning modal',
      content: '这是副文案描述',
    });
  };

  return (
    <>
      {context}
      <h4>使用hook调用</h4>
      <Space>
        <Button onClick={confirm}>Confirm</Button>
        <Button onClick={info}>Info</Button>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
      </Space>
    </>
  );
};

export default () => (
  <ConfigProviderExt themeExt="zeus">
    <App />
  </ConfigProviderExt>
);
