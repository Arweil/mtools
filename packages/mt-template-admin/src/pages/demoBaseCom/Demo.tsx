import React, { useState, useCallback, useEffect } from 'react';
import { Form, Card, Row, Col, DatePicker, Spin } from 'antd';
import { useHistory } from 'malganis/router';
import {
  DynamicInputList,
  InputExt,
  CheckboxGroupExt,
  ButtonExt,
  DatePickerDatePicker,
  DatePickerExt,
  ModalExt,
  SelectExt,
  PopconfirmBtn,
  notificationRedirect,
  SelectInput,
  SelectSelect,
  RadioGroupExt,
} from '@/component/BaseComponentExt';

const { RangePicker } = DatePicker;

function onFinish(
  values: Partial<{
    InputExt: string;
    CheckboxGroupExt: string[];
    DynamicInputList: string[];
  }>,
): void {
  console.log(values);
}

function onConfirm() {
  notificationRedirect({
    type: 'success',
    message: 'success',
    description: 'You will go to Desk Page',
    duration: 3000,
    goFun: () => console.log('Am Run'),
  });
}

export default function Demo(props: {
  initialValues: { [key: string]: any };
  loading: boolean;
  count: number;
  onAdd: () => void;
  onReset: () => void;
}): JSX.Element {
  const history = useHistory();

  const [form] = Form.useForm<
    Partial<{
      InputExt: string;
      CheckboxGroupExt: string[];
      DynamicInputList: string[];
    }>
  >();

  const { initialValues, loading, count, onAdd, onReset } = props;

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  const [modalExtShow, toggleModalExt] = useState<boolean>(false);

  const onShowModalExt = useCallback(() => {
    toggleModalExt(true);
  }, [toggleModalExt]);

  const onModalExtOK = useCallback(() => {
    toggleModalExt(false);
    console.log('onOk');
  }, [toggleModalExt]);

  const onModalExtCancal = useCallback(() => {
    toggleModalExt(false);
    console.log('onCancel');
  }, [toggleModalExt]);

  const onToGoThirdLevelPage = () => {
    history.push('/Demo/DemoBaseCom/ThirdPage');
  };

  return (
    <>
      <Card
        title="Form"
        style={{ marginBottom: 12 }}
        extra={
          <>
            <ButtonExt onClick={onShowModalExt} style={{ marginRight: 8 }}>
              ModalExt
            </ButtonExt>
            <ButtonExt onClick={onToGoThirdLevelPage}>前往第三级菜单</ButtonExt>
          </>
        }
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={initialValues}
            labelCol={{ flex: '0 0 160px' }}
            wrapperCol={{ style: { overflow: 'hidden' } }}
          >
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item label="InputExt" name="InputExt">
                  <InputExt />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="CheckboxGroupExt" name="CheckboxGroupExt">
                  <CheckboxGroupExt
                    dataMap={{
                      testA: 'A',
                      testB: 'B',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DatePickerExt" name="DatePickerExt">
                  <DatePickerExt />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DatePickerDatePicker" name="DatePickerDatePicker" rules={[]}>
                  <DatePickerDatePicker />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="SelectExt" name="SelectExt">
                  <SelectExt
                    dataMap={{
                      testA: 'A',
                      testB: 'B',
                      testC: 'C',
                    }}
                    mode="multiple"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="RangePicker" name="RangePicker">
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="SelectInput" name="SelectInput">
                  <SelectInput
                    selectProps={{
                      dataMap: {
                        testA: 'A',
                        testB: 'B',
                        testC: 'C',
                      },
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="SelectSelect" name="SelectSelect">
                  <SelectSelect
                    selectPropsBefore={{
                      dataMap: {
                        testA: 'A',
                        testB: 'B',
                        testC: 'C',
                      },
                    }}
                    selectPropsAfter={{
                      dataMap: {
                        testA: 'A',
                        testB: 'B',
                        testC: 'C',
                      },
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="RadioGroupExt" name="RadioGroupExt">
                  <RadioGroupExt
                    dataMap={{
                      testA: 'A',
                      testB: 'B',
                      testC: 'C',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DynamicInputList" name="DynamicInputList">
                  <DynamicInputList />
                </Form.Item>
              </Col>
            </Row>
            <ButtonExt isAsyncClick style={{ marginRight: 8 }} htmlType="submit">
              保存
            </ButtonExt>
            <PopconfirmBtn
              isAsyncClick
              title="do you want?"
              btnProps={{
                type: 'primary',
              }}
              onConfirm={onConfirm}
            >
              ConfirmBtn
            </PopconfirmBtn>
          </Form>
        </Spin>

        <ModalExt
          title="The Example For ModalExt"
          visible={modalExtShow}
          onOk={onModalExtOK}
          onCancel={onModalExtCancal}
        >
          This is ModalExt
        </ModalExt>
      </Card>

      <Card title="累加">
        <span style={{ marginRight: 10 }}>{count}</span>
        <ButtonExt onClick={onAdd} style={{ marginRight: 10 }}>
          Add
        </ButtonExt>
        <ButtonExt onClick={onReset}>onReset</ButtonExt>
      </Card>
    </>
  );
}
