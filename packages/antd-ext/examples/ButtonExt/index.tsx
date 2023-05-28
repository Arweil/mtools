import React, { useCallback } from 'react';
import { ButtonExt, Space, Divider, Row, Col, Card, message } from '@m-tools/antd-ext';
import type { ButtonType } from 'antd/es/button';

function ButtonList(props: {
  type: ButtonType;
  disabled: boolean;
  theme?: 'hermes' | 'default' | 'zeus';
}) {
  const { type, disabled, theme } = props;

  const onClick = useCallback(async () => {
    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
        message.success('success !');
      }, 1000);
    });
  }, []);

  return (
    <Space>
      <ButtonExt type={type} disabled={disabled} theme={theme} onClick={onClick} isAsyncClick>
        新增模块
      </ButtonExt>
      <ButtonExt type={type} ghost disabled={disabled} theme={theme}>
        保存
      </ButtonExt>
      <ButtonExt disabled={disabled} theme={theme}>
        取消
      </ButtonExt>
    </Space>
  );
}

export default function App() {
  return (
    <Row gutter={24}>
      <Col span="12">
        <Card title="hermes">
          <ButtonList type="primary" disabled={false} theme="hermes" />
          <Divider />
          <ButtonList type="primary" disabled theme="hermes" />
        </Card>
      </Col>
      <Col span="12">
        <Card title="default">
          <ButtonList type="primary" disabled={false} theme="default" />
          <Divider />
          <ButtonList type="primary" disabled theme="default" />
        </Card>
      </Col>
    </Row>
  );
}
