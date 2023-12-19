import React from 'react';
import {
  FormItemExt,
  BaseCascaderExt,
  Form,
  InputExt,
  ProInputNumber,
  DatePickerExt,
  SelectExt,
  Button,
  Col,
  Row,
  Switch,
  TreeSelect,
  Checkbox,
  Radio,
  RangeNumberExt,
} from '@m-tools/antd-ext';
import { treeSelectOptions } from '../constants';

export default function () {
  const [form] = Form.useForm();
  const options = treeSelectOptions;
  return (
    <Form form={form}>
      <FormItemExt
        name="dir"
        label="BaseCascaderExt"
        rules={[{ required: true, message: '请选择地名' }]}
      >
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
        <Col span={8}>
          <FormItemExt name="DatePickerExt" label="DatePickerExt" rules={[{ required: true }]}>
            <DatePickerExt />
          </FormItemExt>
        </Col>
        <Col span={8}>
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
        <Col span={8}>
          <FormItemExt
            validateStatus="warning"
            name="TreeSelect2"
            label="TreeSelect"
            rules={[{ required: true }]}
          >
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
      <FormItemExt name="DateRangePicker" label="DateRangePicker" rules={[{ required: true }]}>
        <DatePickerExt.RangePicker />
      </FormItemExt>
      <Row gutter={8}>
        <Col span={8}>
          <FormItemExt
            valuePropName="checked"
            name="Switch"
            label="Switch"
            rules={[{ required: true }]}
          >
            <Switch />
          </FormItemExt>
        </Col>
        <Col span={8}>
          <FormItemExt name="Checkbox" label="Checkbox">
            <Checkbox.Group>
              <Checkbox value="83">苹果</Checkbox>
              <Checkbox value="432">戴尔</Checkbox>
            </Checkbox.Group>
          </FormItemExt>
        </Col>
        <Col span={8}>
          {/*没有星号，但是必填*/}
          <FormItemExt required={false} name="Radio" label="Radio" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="123">苹果</Radio>
              <Radio value="432">戴尔</Radio>
            </Radio.Group>
          </FormItemExt>
        </Col>
      </Row>
      <FormItemExt
        label="RangeNumberExt"
        name="RangeNumberExt"
        rules={[
          { required: true, message: '请填写起始结束值' },
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
      </FormItemExt>
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
