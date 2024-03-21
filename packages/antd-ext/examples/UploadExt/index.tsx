import type { Theme } from '@m-tools/antd-ext';
import { Card, Col, Form, Radio, Row, UploadExt } from '@m-tools/antd-ext';
import type { UploadExtProps } from '@m-tools/antd-ext/UploadExt/UploadExt';
import React, { useState } from 'react';

export default function App() {
  const [theme, setTheme] = useState<Theme>('hermes');
  const [listType, setListType] = useState<UploadExtProps['listType']>();
  const [fileList, setFileList] = useState<UploadExtProps['fileList']>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'xxx.docx',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'xxx.pdf',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'xxx.sh',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'uploading file.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  return (
    <div>
      <div>
        <Form>
          <Form.Item label="主题">
            <Radio.Group
              value={theme}
              style={{ marginBottom: 24 }}
              buttonStyle="solid"
              onChange={e => setTheme(e.target.value)}
            >
              <Radio.Button value="hermes">hermes</Radio.Button>
              <Radio.Button value="zeus">zeus</Radio.Button>
              <Radio.Button value="default">default</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="listType">
            <Radio.Group
              value={listType}
              style={{ marginBottom: 24 }}
              buttonStyle="solid"
              onChange={e => setListType(e.target.value)}
            >
              <Radio.Button value={undefined}>默认</Radio.Button>
              <Radio.Button value="text">text</Radio.Button>
              <Radio.Button value="picture">picture</Radio.Button>
              <Radio.Button value="picture-card">picture-card</Radio.Button>
              <Radio.Button value="picture-circle">picture-circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
      <Row gutter={24}>
        <Col span={12}>
          <Card title={`主题：${theme}`} style={{ marginBottom: 24 }}>
            <UploadExt
              listType={listType}
              theme={theme}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => {
                setFileList(newFileList);
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
