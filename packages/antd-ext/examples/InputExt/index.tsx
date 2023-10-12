import React, { useState } from 'react';
import {
  ConfigProviderExt,
  locale,
  Form,
  InputExt,
  Input,
  ButtonExt,
  InputOutLineExt,
  Radio,
  Card,
} from '@m-tools/antd-ext';
import type { FormLayout } from 'antd/es/form/Form';

export default function App() {
  const [layout, setLayout] = useState<FormLayout>('horizontal');
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const formItemLayoutB =
    layout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  const formItemLayoutA =
    layout === 'horizontal' || layout === 'vertical'
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null;

  return (
    <ConfigProviderExt locale={locale.zh_CN}>
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

      <Card title="InputOutLineExt（layout vertical不可用）" style={{ marginBottom: 24 }}>
        <Form
          form={form1}
          layout={layout === 'vertical' ? 'horizontal' : layout}
          {...formItemLayoutA}
        >
          <Form.Item name={['form1', 'labelInsideValueA']} rules={[{ required: true }]}>
            <InputOutLineExt label="文本" placeholder="请输入文本" />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueB']}>
            <InputOutLineExt label="文本内容" placeholder="请输入文本内容" />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueC']}>
            <InputOutLineExt label="文本清除" allowClear placeholder="请输入文本内容" />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueD']}>
            <InputOutLineExt label="文本内容拓展" placeholder="请输入文本内容拓展" />
          </Form.Item>
          <Form.Item>
            <ButtonExt onClick={() => alert(JSON.stringify(form1.getFieldsValue()))}>
              GetFieldsValue
            </ButtonExt>
          </Form.Item>
        </Form>
      </Card>

      <Card title="InputExt">
        <Form form={form2} layout={layout} {...formItemLayoutB}>
          <Form.Item label="InputExt" name={['form2', 'valueA']} rules={[{ required: true }]}>
            <InputExt theme="hermes" placeholder="请输入文本" />
          </Form.Item>
          <Form.Item label="Success" name={['form2', 'valueB']} validateStatus="success">
            <InputExt theme="hermes" placeholder="请输入文本" />
          </Form.Item>
          <Form.Item label="Warning" name={['form2', 'valueC']} validateStatus="warning">
            <InputExt theme="hermes" placeholder="请输入文本" />
          </Form.Item>
          <Form.Item label="Search" name={['form2', 'valueD']}>
            <InputExt.Search theme="hermes" placeholder="请输入Search" />
          </Form.Item>
          <Form.Item label="Password" name={['form2', 'valueE']}>
            <InputExt.Password theme="hermes" placeholder="请输入Password" />
          </Form.Item>
          <Form.Item label="TextArea" name={['form2', 'valueF']}>
            <InputExt.TextArea theme="hermes" placeholder="请输入TextArea" />
          </Form.Item>
          <Form.Item label="Input Compact">
            <Input.Group compact>
              <Form.Item noStyle name={['form2', 'valueBefore']}>
                <InputExt theme="hermes" placeholder="before" style={{ width: '50%' }} />
              </Form.Item>
              <Form.Item noStyle name={['form2', 'valueAfter']}>
                <InputExt theme="hermes" placeholder="after" style={{ width: '50%' }} />
              </Form.Item>
            </Input.Group>
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
