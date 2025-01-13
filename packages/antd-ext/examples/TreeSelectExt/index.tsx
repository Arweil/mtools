import type { Theme } from '@m-tools/antd-ext';
import {
  ButtonExt,
  Card,
  ConfigProviderExt,
  Form,
  locale,
  Radio,
  TreeSelectExt,
  TreeSelectOutLineExt,
} from '@m-tools/antd-ext';
import React, { useState } from 'react';

const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };

export default function App() {
  const [theme, setTheme] = useState<Theme>('hermes');
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const treeData = [
    {
      value: 'parent 1',
      title: 'parent 1',
      children: [
        {
          value: 'parent 1-0',
          title: 'parent 1-0',
          children: [
            {
              value: 'leaf1',
              title: 'leaf1',
              disabled: true,
            },
            {
              value: 'leaf2',
              title: 'leaf2',
            },
            {
              value: 'leaf3',
              title: 'leaf3',
            },
            {
              value: 'leaf4',
              title: 'leaf4',
            },
            {
              value: 'leaf5',
              title: 'leaf5',
            },
            {
              value: 'leaf6',
              title: 'leaf6',
            },
            {
              value: 'leaf7',
              title: 'leaf7',
            },
            {
              value: 'leaf8',
              title: 'leaf8',
            },
            {
              value: 'leaf9',
              title: 'leaf9',
            },
            {
              value: 'leaf10',
              title: 'leaf10',
            },
          ],
        },
        {
          value: 'parent 1-1',
          title: 'parent 1-1',
          children: [
            {
              value: 'leaf11',
              title: <b style={{ color: '#08c' }}>leaf11</b>,
            },
          ],
        },
      ],
    },
  ];

  return (
    <ConfigProviderExt locale={locale.zh_CN} themeExt={theme}>
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

      <Card title="CascaderOutLineExt" style={{ marginBottom: 24 }}>
        <Form form={form1} {...formItemLayout}>
          <Form.Item name={['form1', 'labelInside']} rules={[{ required: true }]}>
            <TreeSelectOutLineExt label="空树" treeData={[]} placeholder="请选择" />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideA']} rules={[{ required: true }]}>
            <TreeSelectOutLineExt
              label="树单选"
              open
              treeData={treeData}
              placeholder="请选择"
              maxTagCount
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideB']} rules={[{ required: true }]}>
            <TreeSelectOutLineExt
              label="树多选"
              treeData={treeData}
              placeholder="请选择"
              maxTagCount
              // open
              multiple
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideC']} rules={[{ required: true }]}>
            <TreeSelectOutLineExt
              label="树勾选框"
              treeCheckable
              treeData={treeData}
              placeholder="请选择"
              maxTagCount
            />
          </Form.Item>
          <Form.Item>
            <ButtonExt onClick={() => alert(JSON.stringify(form1.getFieldsValue()))}>
              GetFieldsValue
            </ButtonExt>
          </Form.Item>
        </Form>
      </Card>

      <Card title="CascaderExt" style={{ marginBottom: 24 }}>
        <Form form={form2} {...formItemLayout}>
          <Form.Item
            label="树单选"
            name={['form2', 'labelInsideValueA']}
            rules={[{ required: true }]}
          >
            <TreeSelectExt treeData={treeData} placeholder="请选择" />
          </Form.Item>
          <Form.Item
            label="树多选"
            name={['form2', 'labelInsideValueB']}
            rules={[{ required: true }]}
          >
            <TreeSelectExt multiple treeData={treeData} placeholder="请选择" />
          </Form.Item>
          <Form.Item
            label="树选择框"
            name={['form2', 'labelInsideValueC']}
            rules={[{ required: true }]}
          >
            <TreeSelectExt treeCheckable treeData={treeData} placeholder="请选择" />
          </Form.Item>
        </Form>
      </Card>
    </ConfigProviderExt>
  );
}
