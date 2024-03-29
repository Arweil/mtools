import React, { useState } from 'react';
import type { Theme } from '@m-tools/antd-ext';
import {
  ConfigProviderExt,
  locale,
  Form,
  ProInputNumberOutLine,
  ButtonExt,
  Radio,
  Card,
  ProInputNumber,
  Row,
  Col,
} from '@m-tools/antd-ext';
import type { FormLayout } from 'antd/es/form/Form';

export default function App() {
  const [layout, setLayout] = useState<FormLayout>('horizontal');
  const [theme, setTheme] = useState<Theme>('hermes');
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const formItemLayoutB =
    layout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  const formItemLayoutA =
    layout === 'horizontal' || layout === 'vertical'
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null;

  return (
    <ConfigProviderExt locale={locale.zh_CN} themeExt={theme}>
      <div>
        <Radio.Group
          value={layout}
          style={{ marginBottom: 24 }}
          buttonStyle="solid"
          onChange={e => setLayout(e.target.value)}
        >
          <Radio.Button value="horizontal">horizontal</Radio.Button>
          <Radio.Button value="inline">inline</Radio.Button>
          <Radio.Button value="vertical">vertical</Radio.Button>
        </Radio.Group>
      </div>

      <div>
        <Radio.Group
          value={theme}
          style={{ marginBottom: 24 }}
          buttonStyle="solid"
          onChange={e => setTheme(e.target.value)}
        >
          <Radio.Button value="hermes">hermes</Radio.Button>
          <Radio.Button value="default">default</Radio.Button>
        </Radio.Group>
      </div>

      <Card title="ProInputNumberOutLine（layout vertical不可用）" style={{ marginBottom: 24 }}>
        <Form
          form={form1}
          layout={layout === 'vertical' ? 'horizontal' : layout}
          {...formItemLayoutA}
        >
          <Form.Item name={['form1', 'labelInsideValueA']} rules={[{ required: true }]}>
            <ProInputNumberOutLine
              label="文本"
              placeholder="请输入文本"
              needThousandths
              precision={6}
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueB']}>
            <ProInputNumberOutLine
              label="文本内容"
              placeholder="请输入文本内容"
              needThousandths
              precision={6}
              allowClear
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueC']}>
            <ProInputNumberOutLine
              label="文本内容拓展"
              placeholder="请输入文本内容拓展"
              needThousandths
              precision={6}
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueD']}>
            <ProInputNumberOutLine
              label="禁用"
              disabled
              placeholder="请输入文本"
              needThousandths
              precision={6}
            />
          </Form.Item>
          <Form.Item>
            <ButtonExt onClick={() => alert(JSON.stringify(form1.getFieldsValue()))}>
              GetFieldsValue
            </ButtonExt>
          </Form.Item>
        </Form>
      </Card>

      <Card title="ProInputNumber" style={{ marginBottom: 24 }}>
        <Form form={form2} layout={layout} {...formItemLayoutB}>
          <Form.Item label="ProInputNumber" name={['form2', 'valueA']} rules={[{ required: true }]}>
            <ProInputNumber placeholder="请输入" needThousandths precision={2} />
          </Form.Item>
          <Form.Item
            label="NoNeedThousandths"
            name={['form2', 'valueB']}
            rules={[{ required: true }]}
          >
            <ProInputNumber placeholder="请输入" precision={2} />
          </Form.Item>
          <Form.Item label="Precision 6" name={['form2', 'valueC']} rules={[{ required: true }]}>
            <ProInputNumber placeholder="请输入" precision={6} />
          </Form.Item>
          <Form.Item
            label="ProInputNumber Hermes"
            name={['form2', 'valueD']}
            rules={[{ required: true }]}
          >
            <ProInputNumber placeholder="请输入" needThousandths precision={2} />
          </Form.Item>
          <Form.Item label="禁用" name={['form2', 'valueD']}>
            <ProInputNumber disabled placeholder="请输入" needThousandths precision={2} />
          </Form.Item>
          <Form.Item>
            <ButtonExt onClick={() => alert(JSON.stringify(form2.getFieldsValue()))}>
              GetFieldsValue
            </ButtonExt>
          </Form.Item>
        </Form>
      </Card>

      <Card title="脱离Form.Item">
        <Row gutter={10}>
          <Col span={6}>
            <ProInputNumberOutLine label="Label" allowClear />
          </Col>
          <Col span={6}>
            <ProInputNumberOutLine label="Label" disabled />
          </Col>
        </Row>
      </Card>
    </ConfigProviderExt>
  );
}
