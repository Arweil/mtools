import React from 'react';
import { Card, Col, RadioGroupExt, Row } from '@m-tools/antd-ext';

export default function App() {
  return (
    <Row gutter={24}>
      <Col span="12">
        <Card title="hermes">
          <RadioGroupExt
            style={{ marginBottom: 24 }}
            theme="hermes"
            options={[
              {
                label: 'Hangzhou',
                value: 'Hangzhou',
              },
              {
                label: 'Shanghai',
                value: 'Shanghai',
              },
              {
                label: 'Beijing',
                value: 'Beijing',
              },
              {
                label: 'Chengdu',
                value: 'Chengdu',
              },
            ]}
          />
          <RadioGroupExt
            style={{ marginBottom: 24 }}
            theme="hermes"
            options={[
              {
                label: 'Hangzhou',
                value: 'Hangzhou',
              },
              {
                label: 'Shanghai',
                value: 'Shanghai',
                disabled: true,
              },
              {
                label: 'Beijing',
                value: 'Beijing',
              },
              {
                label: 'Chengdu',
                value: 'Chengdu',
                disabled: true,
              },
            ]}
          />
          <RadioGroupExt
            theme="hermes"
            disabled
            options={[
              {
                label: 'Hangzhou',
                value: 'Hangzhou',
              },
              {
                label: 'Shanghai',
                value: 'Shanghai',
              },
              {
                label: 'Beijing',
                value: 'Beijing',
              },
              {
                label: 'Chengdu',
                value: 'Chengdu',
              },
            ]}
          />
        </Card>
      </Col>
      <Col span="12">
        <Card title="default">
          <RadioGroupExt
            style={{ marginBottom: 24 }}
            theme="default"
            options={[
              {
                label: 'Hangzhou',
                value: 'Hangzhou',
              },
              {
                label: 'Shanghai',
                value: 'Shanghai',
              },
              {
                label: 'Beijing',
                value: 'Beijing',
              },
              {
                label: 'Chengdu',
                value: 'Chengdu',
                disabled: true,
              },
            ]}
          />

          <RadioGroupExt
            theme="default"
            optionType="button"
            buttonStyle="solid"
            options={[
              {
                label: 'Hangzhou',
                value: 'Hangzhou',
              },
              {
                label: 'Shanghai',
                value: 'Shanghai',
              },
              {
                label: 'Beijing',
                value: 'Beijing',
              },
              {
                label: 'Chengdu',
                value: 'Chengdu',
                disabled: true,
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
}
