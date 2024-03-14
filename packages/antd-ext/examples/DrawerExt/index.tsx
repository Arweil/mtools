import type { Theme } from '@m-tools/antd-ext';
import { ButtonExt, ConfigProviderExt, DrawerExt, Radio, Space } from '@m-tools/antd-ext';
import React, { useCallback, useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(true);
  const [theme, setTheme] = useState<Theme>('hermes');

  const onOk = useCallback(() => {
    console.log('onOK');
    setOpen(false);
  }, []);

  const onCancel = useCallback(() => {
    console.log('onCancel');
    setOpen(false);
  }, []);

  return (
    <ConfigProviderExt themeExt={theme}>
      <Space>
        <ButtonExt onClick={() => setOpen(true)}>Show Drawer</ButtonExt>
        <Radio.Group value={theme} buttonStyle="solid" onChange={e => setTheme(e.target.value)}>
          <Radio.Button value="hermes">hermes</Radio.Button>
          <Radio.Button value="zeus">zeus</Radio.Button>
          <Radio.Button value="default">default</Radio.Button>
        </Radio.Group>
      </Space>
      <DrawerExt
        title="抽屉"
        open={open}
        styles={{
          body: { padding: 0 },
        }}
        onOk={onOk}
        onCancel={onCancel}
      />
    </ConfigProviderExt>
  );
}
