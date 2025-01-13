import type { Theme } from '@m-tools/antd-ext';
import {
  ButtonExt,
  Card,
  CascaderExt,
  CascaderOutLineExt,
  ConfigProviderExt,
  Form,
  locale,
  Radio,
  TreeSelectExt,
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

  const options = [
    {
      value: 'zhejiang',
      label: 'ZhejiangZhejiangZhejiangZhejiangZhejiangZhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          disabled: true,
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu5',
      label: 'Jiangsu5',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu1',
      label: 'Jiangsu1',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
    {
      value: 'qqq',
      label: 'qqq',
      children: [
        {
          value: 'nanwwwjing',
          label: 'Nanjeeing',
        },
      ],
    },
    {
      value: 'rrr',
      label: 'tttt',
      children: [
        {
          value: '222',
          label: '333',
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
          <Form.Item name={['form1', 'labelValueA']} rules={[{ required: false }]}>
            <CascaderOutLineExt label="空数据" options={[]} placeholder="请选择" maxTagCount />
          </Form.Item>
          <Form.Item name={['form1', 'labelValueB']} rules={[{ required: false }]}>
            <CascaderOutLineExt
              label="级联单选"
              options={options}
              placeholder="请选择"
              maxTagCount
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideC']} rules={[{ required: false }]}>
            <CascaderOutLineExt
              multiple
              label="级联多选"
              options={options}
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
            label="级联选项"
            name={['form1', 'labelInsideValueA']}
            rules={[{ required: true }]}
          >
            <CascaderExt options={options} placeholder="请选择" />
          </Form.Item>
          <Form.Item
            label="级联多选"
            name={['form1', 'labelInsideValueB']}
            rules={[{ required: true }]}
          >
            <CascaderExt multiple options={options} placeholder="请选择" />
          </Form.Item>
          <Form.Item
            label="树选择"
            name={['form1', 'labelInsideValueAA']}
            rules={[{ required: true }]}
          >
            <TreeSelectExt treeCheckable treeData={treeData} placeholder="请选择" />
          </Form.Item>
        </Form>
      </Card>
    </ConfigProviderExt>
  );
}
