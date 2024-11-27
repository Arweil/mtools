import type { Theme } from '@m-tools/antd-ext';
import {
  ButtonExt,
  Card,
  CascaderExt,
  CascaderOutLineExt,
  Col,
  ConfigProviderExt,
  Form,
  Input,
  locale,
  Radio,
  Row,
  SelectExt,
  SelectOutLineExt,
  Space,
  TreeSelectExt,
  TreeSelectOutLineExt,
} from '@m-tools/antd-ext';
import type { FormLayout } from 'antd/es/form/Form';
import React, { useMemo, useState } from 'react';

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

  const labelReactNodeData = [
    {
      en: 'China',
      cn: '中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国',
      icon: '🇨🇳',
    },
    {
      en: 'USA',
      cn: '美国',
      icon: '🇺🇸',
    },
  ];

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

      <Card title="SelectOutLineExt（layout vertical不可用）" style={{ marginBottom: 24 }}>
        <Form
          form={form1}
          layout={layout === 'vertical' ? 'horizontal' : layout}
          {...formItemLayoutA}
        >
          <Form.Item name={['form1', 'labelInsideValueA']} rules={[{ required: true }]}>
            <SelectOutLineExt label="文本" placeholder="请选择" />
          </Form.Item>
          <Form.Item name={['form1', 'labelValueA']} rules={[{ required: false }]}>
            <CascaderOutLineExt
              label="级联单选"
              options={[
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
                  value: 'jiangsu',
                  label: 'Jiangsu',
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
              ]}
              placeholder="请选择"
              maxTagCount
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInside']} rules={[{ required: false }]}>
            <CascaderOutLineExt
              multiple
              label="级联多选"
              options={[
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
                  value: 'jiangsu',
                  label: 'Jiangsu',
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
              ]}
              placeholder="请选择"
              maxTagCount
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideA']} rules={[{ required: true }]}>
            <TreeSelectOutLineExt
              label="树选择"
              treeCheckable
              treeData={[
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
              ]}
              placeholder="请选择"
              maxTagCount
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueB']}>
            <SelectOutLineExt
              label="文本内容"
              placeholder="请选择"
              options={[
                { renameLabel: 'ItemA', renameValue: 'ItemA' },
                {
                  renameLabel:
                    '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
                  renameValue: 'ItemB',
                },
              ]}
              style={layout === 'inline' ? { width: 130 } : {}}
              fieldNames={{
                label: 'renameLabel',
                value: 'renameValue',
              }}
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueC']}>
            <SelectOutLineExt
              label="文本多选"
              placeholder="请选择"
              mode="multiple"
              showSearch
              options={[
                { renameLabel: 'ItemA', renameValue: 'ItemA' },
                { renameLabel: 'ItemB', renameValue: 'ItemB' },
                {
                  renameLabel:
                    'ItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemCItemC',
                  renameValue: 'ItemC',
                },
                { renameLabel: 'ItemD', renameValue: 'ItemD' },
              ]}
              fieldNames={{
                label: 'renameLabel',
                value: 'renameValue',
              }}
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueD']}>
            <SelectOutLineExt
              label="文本内容拓展"
              placeholder="请选择"
              mode="multiple"
              showSearch
              defaultValue={['ItemD']}
              options={[
                { renameLabel: 'ItemA', renameValue: 'ItemA' },
                { renameLabel: 'ItemB', renameValue: 'ItemB' },
                { renameLabel: 'ItemC', renameValue: 'ItemC', disabled: true },
                { renameLabel: 'ItemD', renameValue: 'ItemD', disabled: true },
                { renameLabel: 'ItemE', renameValue: 'ItemE' },
                { renameLabel: 'ItemF', renameValue: 'ItemF' },
                { renameLabel: 'ItemG', renameValue: 'ItemG' },
                { renameLabel: 'ItemH', renameValue: 'ItemH' },
                { renameLabel: 'ItemI', renameValue: 'ItemI' },
                { renameLabel: 'ItemJ', renameValue: 'ItemJ' },
                { renameLabel: 'ItemK', renameValue: 'ItemK' },
                { renameLabel: 'ItemL', renameValue: 'ItemL' },
                { renameLabel: 'ItemM', renameValue: 'ItemM' },
                { renameLabel: 'ItemN', renameValue: 'ItemN' },
                { renameLabel: 'ItemO', renameValue: 'ItemO' },
                { renameLabel: 'ItemP', renameValue: 'ItemP' },
                { renameLabel: 'ItemQ', renameValue: 'ItemQ' },
              ]}
              fieldNames={{
                label: 'renameLabel',
                value: 'renameValue',
              }}
            />
          </Form.Item>
          <Form.Item name={['form1', 'labelInsideValueE']}>
            <SelectOutLineExt label="禁用" disabled placeholder="请选择" />
          </Form.Item>
          <Form.Item>
            <ButtonExt onClick={() => alert(JSON.stringify(form1.getFieldsValue()))}>
              GetFieldsValue
            </ButtonExt>
          </Form.Item>
        </Form>
      </Card>

      <Card title="SelectExt" style={{ marginBottom: 24 }}>
        <Form form={form2} layout={layout} {...formItemLayoutB}>
          <Form.Item label="SelectExt无选项" name={['form2', 'valueA1']}>
            <SelectExt placeholder="请选择" />
          </Form.Item>
          <Form.Item label="禁用" name={['form2', 'valueA1']}>
            <SelectExt disabled placeholder="请选择" />
          </Form.Item>
          <ConfigProviderExt locale={locale.en_US}>
            <Form.Item label="SelectExt No Option" name={['form2', 'valueA1-1']}>
              <SelectExt placeholder="Please Select" />
            </Form.Item>
          </ConfigProviderExt>

          <Form.Item label="SelectExt一个选项" name={['form2', 'valueA2']}>
            <SelectExt placeholder="请选择" options={[{ label: 'ItemA', value: 'ItemA' }]} />
          </Form.Item>
          <Form.Item
            label="级联选项"
            name={['form1', 'labelInsideValueA']}
            rules={[{ required: true }]}
          >
            <CascaderExt
              options={[
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
                  value: 'jiangsu',
                  label: 'Jiangsu',
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
              ]}
              placeholder="请选择"
            />
          </Form.Item>
          <Form.Item
            label="树选择"
            name={['form1', 'labelInsideValueAA']}
            rules={[{ required: true }]}
          >
            <TreeSelectExt
              treeCheckable
              treeData={[
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
              ]}
              placeholder="请选择"
            />
          </Form.Item>
          <Form.Item label="SelectExt长选项" name={['form2', 'valueA3']}>
            <SelectExt
              placeholder="请选择"
              options={[
                { label: 'ItemA', value: 'ItemA' },
                {
                  label:
                    '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
                  value: 'ItemB',
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="SelectExt搜索" name={['form2', 'valueA4']}>
            <SelectExt
              placeholder="请选择"
              mode="multiple"
              showSearch
              options={[
                { renameLabel: 'ItemA', renameValue: 'ItemA' },
                { renameLabel: 'ItemB', renameValue: 'ItemB' },
                { renameLabel: 'ItemC', renameValue: 'ItemC' },
                { renameLabel: 'ItemD', renameValue: 'ItemD' },
                { renameLabel: 'ItemE', renameValue: 'ItemE' },
                { renameLabel: 'ItemF', renameValue: 'ItemF' },
                { renameLabel: 'ItemG', renameValue: 'ItemG' },
                { renameLabel: 'ItemH', renameValue: 'ItemH' },
              ]}
              fieldNames={{
                label: 'renameLabel',
                value: 'renameValue',
              }}
            />
          </Form.Item>
          <Form.Item label="SelectExt选项禁用" name={['form2', 'valueA5']}>
            <SelectExt
              placeholder="请选择"
              options={[
                { label: 'ItemA', value: 'ItemA', disabled: true },
                {
                  label:
                    '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
                  value: 'ItemB',
                  disabled: true,
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Label是ReactNode" name={['form2', 'valueA6']}>
            <SelectExt
              placeholder="请选择"
              showSearch
              options={labelReactNodeData.map(itm => ({
                label: (
                  <Space>
                    <span role="img" aria-label={itm.en}>
                      {itm.icon}
                    </span>
                    <span>
                      {itm.en}({itm.cn})
                    </span>
                  </Space>
                ),
                value: itm.en,
                ...itm,
              }))}
              filterOption={(inputValue, option) =>
                option.en.toLowerCase().includes(inputValue.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label="LabelNumber" name={['form2', 'valueA8']}>
            <SelectExt
              placeholder="请选择"
              showSearch
              options={[
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
                { label: 4, value: 4 },
                { label: null, value: 5 },
              ]}
            />
          </Form.Item>
          <Form.Item label="Success" name={['form2', 'valueB']} validateStatus="success">
            <SelectExt placeholder="请选择" />
          </Form.Item>
          <Form.Item label="Warning" name={['form2', 'valueC']} validateStatus="warning">
            <SelectExt placeholder="请选择" />
          </Form.Item>
          <Form.Item label="Input Compact">
            <Input.Group compact>
              <Form.Item noStyle name={['form2', 'valueBefore']}>
                <SelectExt placeholder="before" style={{ width: '50%' }} />
              </Form.Item>
              <Form.Item noStyle name={['form2', 'valueAfter']}>
                <SelectExt placeholder="after" style={{ width: '50%' }} />
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

      <Card title="脱离Form.Item">
        <Row gutter={10}>
          <Col span={6}>
            <SelectOutLineExt label="Label" />
          </Col>
          <Col span={6}>
            <SelectOutLineExt
              label="Label"
              options={[
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
                { label: 4, value: 4 },
              ]}
            />
          </Col>
          <Col span={6}>
            <SelectOutLineExt label="Label" disabled />
          </Col>
        </Row>
      </Card>
    </ConfigProviderExt>
  );
}
