import React from 'react';
import {
  FormItemExt,
  BaseCascaderExt,
  Form,
  InputExt,
  ProInputNumber,
  DatePickerExt,
  SelectOutLineExt,
  SelectExt,
} from '@m-tools/antd-ext';
import { Button, Col, Row, TreeSelect } from 'antd';

export default function () {
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
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
  ];

  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <FormItemExt name="dir" label="BaseCascaderExt" rules={[{ required: true }]}>
        <BaseCascaderExt options={options} multiple />
      </FormItemExt>
      <FormItemExt name="InputExt" label="InputExt" rules={[{ required: true }]}>
        <InputExt placeholder="请输入..." />
      </FormItemExt>
      <FormItemExt
        name="ProInputNumber"
        label="ProInputNumber"
        rules={[{ required: false }]}
        colon={false}
      >
        <ProInputNumber />
      </FormItemExt>
      <Row gutter={8}>
        <Col span={12}>
          <FormItemExt name="DatePickerExt" label="DatePickerExt" rules={[{ required: true }]}>
            <DatePickerExt />
          </FormItemExt>
        </Col>
        <Col span={12}>
          <FormItemExt name="TreeSelect" label="TreeSelect" rules={[{ required: true }]}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              multiple
              treeDefaultExpandAll
              treeData={options}
            />
          </FormItemExt>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <FormItemExt name="SelectExt" label="SelectExt" rules={[{ required: true }]}>
            <SelectExt
              placeholder="请选择"
              mode="multiple"
              showSearch
              options={[
                { renameLabel: 'ItemA', renameValue: 'ItemA' },
                { renameLabel: 'ItemB', renameValue: 'ItemB' },
                { renameLabel: 'ItemC', renameValue: 'ItemC' },
                { renameLabel: 'ItemD', renameValue: 'ItemD' },
              ]}
              fieldNames={{
                label: 'renameLabel',
                value: 'renameValue',
              }}
            />
          </FormItemExt>
        </Col>
        <Col span={12}>
          <FormItemExt name="DateRangePicker" label="DateRangePicker" rules={[{ required: true }]}>
            <DatePickerExt.RangePicker />
          </FormItemExt>
        </Col>
      </Row>

      <Button
        onClick={() => {
          form
            .validateFields()
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }}
      >
        提交
      </Button>
    </Form>
  );
}
