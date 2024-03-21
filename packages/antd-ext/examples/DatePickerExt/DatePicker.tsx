import type { Theme } from '@m-tools/antd-ext';
import {
  ButtonExt,
  Card,
  Col,
  ConfigProviderExt,
  DatePickerExt,
  DatePickerOutLineExt,
  Form,
  locale,
  Radio,
  Row,
} from '@m-tools/antd-ext';
import type { FormLayout } from 'antd/es/form/Form';
import React, { useState } from 'react';

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
    <>
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
            <Radio.Button value="zeus">zeus</Radio.Button>
            <Radio.Button value="default">default</Radio.Button>
          </Radio.Group>
        </div>

        <Card title="DatePickerOutLineExt（layout vertical不可用）" style={{ marginBottom: 24 }}>
          <Form
            form={form1}
            layout={layout === 'vertical' ? 'horizontal' : layout}
            {...formItemLayoutA}
          >
            <Form.Item name={['form1', 'labelInsideValueA']} required rules={[{ required: true }]}>
              <DatePickerOutLineExt label="文本" placeholder="请输入文本" />
            </Form.Item>
            <Form.Item name={['form1', 'labelInsideValueB']}>
              <DatePickerOutLineExt label="文本内容" placeholder="请输入文本内容" />
            </Form.Item>
            <Form.Item name={['form1', 'labelInsideValueC']}>
              <DatePickerOutLineExt label="文本清除" allowClear placeholder="请输入文本内容" />
            </Form.Item>
            <Form.Item name={['form1', 'labelInsideValueD']}>
              <DatePickerOutLineExt label="文本内容拓展" placeholder="请输入文本内容拓展" />
            </Form.Item>
            <Form.Item name={['form1', 'labelInsideValueE']}>
              <DatePickerOutLineExt label="禁用" disabled placeholder="请输入文本" />
            </Form.Item>
            <Form.Item>
              <ButtonExt onClick={() => alert(JSON.stringify(form1.getFieldsValue()))}>
                GetFieldsValue
              </ButtonExt>
            </Form.Item>
          </Form>
        </Card>

        <Card title="DatePickerExt" style={{ marginBottom: 24 }}>
          <Form form={form2} layout={layout} {...formItemLayoutB}>
            <Form.Item label="InputExt" name={['form2', 'valueA']} rules={[{ required: true }]}>
              <DatePickerExt placeholder="请输入文本" />
            </Form.Item>
            <Form.Item label="Success" name={['form2', 'valueB']} validateStatus="success">
              <DatePickerExt placeholder="请输入文本" />
            </Form.Item>
            <Form.Item label="Warning" name={['form2', 'valueC']} validateStatus="warning">
              <DatePickerExt placeholder="请输入文本" />
            </Form.Item>
            <Form.Item label="Disabled" name={['form2', 'disabled']}>
              <DatePickerExt disabled placeholder="请输入文本" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <ButtonExt onClick={() => alert(JSON.stringify(form2.getFieldsValue()))}>
                GetFieldsValue
              </ButtonExt>
            </Form.Item>
          </Form>
        </Card>

        <Card title="脱离Form.Item" style={{ marginBottom: 24 }}>
          <Row gutter={10}>
            <Col span={6}>
              <DatePickerOutLineExt label="Label" />
            </Col>
            <Col span={6}>
              <DatePickerOutLineExt label="Label" disabled />
            </Col>
          </Row>
        </Card>
      </ConfigProviderExt>

      <Card title="脱离 ConfigProviderExt">
        <DatePickerOutLineExt label="文本" theme={theme} placeholder="请输入文本" />
      </Card>
    </>
  );
}
