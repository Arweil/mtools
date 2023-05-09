import React from 'react';
import { ButtonExt, ConfigProviderExt, Divider } from 'antd-ext';

export default function () {
  return (
    <ConfigProviderExt themeExt="zeus">
      <ButtonExt theme="zeus">宙斯</ButtonExt>
      <ButtonExt theme="default">默认</ButtonExt>
      <ButtonExt theme="hermes">电销</ButtonExt>
      <ButtonExt type="primary">主要按钮</ButtonExt>
      <Divider type="horizontal" />
      <ButtonExt size="large" type="dashed">
        大按钮
      </ButtonExt>
      <Divider type="horizontal" />

      <ButtonExt size="large" type="dashed" shape="circle">
        大圆按钮
      </ButtonExt>
    </ConfigProviderExt>
  );
}
