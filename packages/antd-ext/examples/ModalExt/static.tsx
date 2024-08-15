import { Button, ConfigProviderExt, ModalExt, Space } from '@m-tools/antd-ext';
import React from 'react';

const App = () => {
  const confirm = () => {
    ModalExt.confirm({
      title: '这是一个confirm modal',
      content: '这是副文案描述',
      okText: '确认',
      cancelText: '取消',
      onOk: () => console.log('ok'),
    });
  };

  const info = () => {
    ModalExt.info({
      title: '这是一个info modal',
      content: '这是副文案描述',
    });
  };

  const success = () => {
    ModalExt.success({
      title: '这是一个success modal',
      content: '这是副文案描述',
    });
  };

  const error = () => {
    ModalExt.error({
      title: '这是一个error modal',
      content: '这是副文案描述',
    });
  };

  const warning = () => {
    ModalExt.warning({
      title: '这是一个warning modal',
      content: '这是副文案描述',
    });
  };

  return (
    <>
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

export default () => {
  // 针对静态方法进行 Provider 配置
  ConfigProviderExt.config({
    themeExt: 'zeus',
    prefixCls: 'antd-ext-example',
  });

  return (
    <ConfigProviderExt>
      <App />
    </ConfigProviderExt>
  );
};
