import React, { useMemo, useState } from 'react';
import {
  ConfigProviderExt,
  RangeNumberExt,
  RangeNumberOutLineExt,
  Form,
  ButtonExt,
  Card,
  locale,
  Radio,
  Row,
  Col,
} from '@m-tools/antd-ext';
import type { Theme } from '@m-tools/antd-ext';
import type { FormLayout } from 'antd/es/form/Form';

export default function App() {
  const [layout, setLayout] = useState<FormLayout>('horizontal');
  const [theme, setTheme] = useState<Theme>('hermes');
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const formItemLayoutB = useMemo(
    () => (layout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null),
    [layout],
  );

  const formItemLayoutA = useMemo(
    () =>
      layout === 'horizontal' || layout === 'vertical'
        ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
        : null,
    [layout],
  );

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

      <Card title="RangeNumberOutLineExt（layout vertical不可用）" style={{ marginBottom: 24 }}>
        <Form
          form={form1}
          layout={layout === 'vertical' ? 'horizontal' : layout}
          {...formItemLayoutA}
        >
          <Form.Item name={['form1', 'labelInsideValueA']}>
            <RangeNumberOutLineExt label="文本" placeholder={['before', 'after']} />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueB']}>
            <RangeNumberOutLineExt label="文本内容" placeholder={['before', 'after']} />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueC']}>
            <RangeNumberOutLineExt label="文本内容拓展" placeholder={['before', 'after']} />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueD']}>
            <RangeNumberOutLineExt disabled label="文本" placeholder={['before', 'after']} />
          </Form.Item>
          <Form.Item>
            <ButtonExt onClick={() => alert(JSON.stringify(form1.getFieldsValue()))}>
              GetFieldsValue
            </ButtonExt>
          </Form.Item>
        </Form>
      </Card>

      <Card title="RangeNumberExt">
        <Form form={form2} layout={layout} {...formItemLayoutB}>
          <Form.Item
            required
            label="RangeNumberExt"
            name={['form2', 'valueA1']}
            rules={[
              {
                validator: async (rule, value) => {
                  if (value === undefined || value.length < 2) {
                    return Promise.resolve();
                  }

                  if (value[0] === null && value[1] === null) {
                    return Promise.reject(new Error('必填'));
                  }

                  if (value[0] === null) {
                    return Promise.reject(new Error('起始值必填'));
                  }

                  if (value[1] === null) {
                    return Promise.reject(new Error('结束值必填'));
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <RangeNumberExt placeholder={['before', 'after']} />
          </Form.Item>
          <Form.Item label="RangeNumberExt" name={['form2', 'valueA2']}>
            <RangeNumberExt placeholder={['before', 'after']} disabled />
          </Form.Item>
          <Form.Item label="Success" name={['form2', 'valueB']} validateStatus="success">
            <RangeNumberExt placeholder={['before', 'after']} />
          </Form.Item>
          <Form.Item label="Warning" name={['form2', 'valueC']} validateStatus="warning">
            <RangeNumberExt placeholder={['before', 'after']} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <ButtonExt onClick={() => alert(JSON.stringify(form2.getFieldsValue()))}>
              GetFieldsValue
            </ButtonExt>
          </Form.Item>
        </Form>
      </Card>
      <Card title="脱离Form.Item">
        <Row gutter={10}>
          <Col span={6}>
            <RangeNumberOutLineExt label="Label" />
          </Col>
          <Col span={6}>
            <RangeNumberOutLineExt label="Label" disabled value={[100, 200]} />
          </Col>
        </Row>
      </Card>
    </ConfigProviderExt>
  );
}
