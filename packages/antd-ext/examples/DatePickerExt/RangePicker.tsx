import React, { useState } from 'react';
import type { Theme } from '@m-tools/antd-ext';
import {
  ConfigProviderExt,
  locale,
  Form,
  DatePickerExt,
  RangePickerOutLineExt,
  ButtonExt,
  Radio,
  Card,
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

      <Card title="RangePickerOutLineExt（layout vertical不可用）" style={{ marginBottom: 24 }}>
        <Form
          form={form1}
          layout={layout === 'vertical' ? 'horizontal' : layout}
          {...formItemLayoutA}
        >
          <Form.Item name={['form1', 'labelInsideValueA']} rules={[{ required: true }]}>
            <RangePickerOutLineExt label="文本" />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueB']}>
            <RangePickerOutLineExt label="文本内容" />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueC']}>
            <RangePickerOutLineExt label="文本清除" />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueD']}>
            <RangePickerOutLineExt label="文本内容拓展" />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueE']}>
            <RangePickerOutLineExt label="禁用" disabled />
          </Form.Item>
          <Form.Item>
            <ButtonExt onClick={() => alert(JSON.stringify(form1.getFieldsValue()))}>
              GetFieldsValue
            </ButtonExt>
          </Form.Item>
        </Form>
      </Card>

      <Card title="DatePickerExt.RangePicker">
        <Form form={form2} layout={layout} {...formItemLayoutB}>
          <Form.Item label="InputExt" name={['form2', 'valueA']} rules={[{ required: true }]}>
            <DatePickerExt.RangePicker />
          </Form.Item>
          <Form.Item label="Success" name={['form2', 'valueB']} validateStatus="success">
            <DatePickerExt.RangePicker />
          </Form.Item>
          <Form.Item label="Warning" name={['form2', 'valueC']} validateStatus="warning">
            <DatePickerExt.RangePicker />
          </Form.Item>
          <Form.Item label="Disabled" name={['form2', 'disabled']}>
            <DatePickerExt.RangePicker disabled />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <ButtonExt onClick={() => alert(JSON.stringify(form2.getFieldsValue()))}>
              GetFieldsValue
            </ButtonExt>
          </Form.Item>
        </Form>
      </Card>
    </ConfigProviderExt>
  );
}
