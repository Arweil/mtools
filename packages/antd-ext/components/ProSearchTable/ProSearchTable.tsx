import React, { useCallback, useMemo, useState } from 'react';
import { Form, Divider, Row, Col, Flex, Space } from 'antd';
import { TableExt, InputOutLineExt, SelectOutLineExt, ButtonExt } from '../index';
import { DownOutlined, UpOutlined } from '../icon';

const span = 6;

export default function ProSearchTable() {
  const [form] = Form.useForm();
  // 是否展开，true：展开，false：收起
  const [expand, setExpand] = useState(false);

  const onFinish = useCallback(values => {}, []);

  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onExpand = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  // 搜索按钮span
  const searchBtnSpan = useMemo(() => {
    const n = Math.floor(24 / span);
    return (6 % n) * span;
  }, []);

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={span}>
            <Form.Item name="FormItemA">
              <InputOutLineExt label="FormItemA" placeholder="请输入文本" />
            </Form.Item>
          </Col>
          <Col span={span}>
            <Form.Item name="FormItemB">
              <SelectOutLineExt label="FormItemB" placeholder="请选择" />
            </Form.Item>
          </Col>
          <Col span={span}>
            <Form.Item name="FormItemC">
              <InputOutLineExt label="FormItemC" placeholder="请输入文本" />
            </Form.Item>
          </Col>
          <Col span={span}>
            <Form.Item name="FormItemD">
              <InputOutLineExt label="FormItemD" placeholder="请输入文本" />
            </Form.Item>
          </Col>
          <Col span={span}>
            <Form.Item name="FormItemE">
              <InputOutLineExt label="FormItemE" placeholder="请输入文本" />
            </Form.Item>
          </Col>
          <Col span={span}>
            <Form.Item name="FormItemF">
              <InputOutLineExt label="FormItemF" placeholder="请输入文本" />
            </Form.Item>
          </Col>
          <Col span={searchBtnSpan}>
            <Form.Item>
              <Flex justify="flex-end" gap={8}>
                <ButtonExt type="primary" htmlType="submit">
                  查询
                </ButtonExt>
                <ButtonExt htmlType="reset" onClick={onReset}>
                  重置
                </ButtonExt>
                <ButtonExt type="link" onClick={onExpand}>
                  <Space align="center" size={0}>
                    <span>{expand ? '收起' : '展开'}</span>
                    {expand ? <UpOutlined /> : <DownOutlined />}
                  </Space>
                </ButtonExt>
              </Flex>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider style={{ margin: '0 0 20px 0' }} />
      <Flex justify="flex-end" gap={8} style={{ marginBottom: 12 }}>
        <ButtonExt isAsyncClick type="primary">
          按钮A
        </ButtonExt>
        <ButtonExt isAsyncClick type="primary">
          按钮B
        </ButtonExt>
        <ButtonExt isAsyncClick type="primary">
          按钮C
        </ButtonExt>
      </Flex>
      <TableExt
        columns={[
          {
            dataIndex: 'FormItemA',
            title: 'FormItemA',
          },
          {
            dataIndex: 'FormItemB',
            title: 'FormItemB',
          },
          {
            dataIndex: 'FormItemC',
            title: 'FormItemC',
          },
          {
            dataIndex: 'FormItemD',
            title: 'FormItemD',
          },
          {
            dataIndex: 'FormItemE',
            title: 'FormItemE',
          },
          {
            dataIndex: 'FormItemF',
            title: 'FormItemF',
          },
        ]}
        dataSource={[]}
      />
    </div>
  );
}
