/**
 * title: 基础用法
 * description: blockNode（是否节点占据一行）默认为true
 */
import { FileFilled, FolderFilled, FrownFilled, SmileOutlined } from '@ant-design/icons';
import type { Theme } from '@m-tools/antd-ext';
import { Card, Col, Form, Row, Switch, Tree, TreeExt } from '@m-tools/antd-ext';
import type { TreeDataNodeExt } from '@m-tools/antd-ext/TreeExt/TreeExt';
import React, { useState } from 'react';
// import { Tree as AntdTree } from 'antd';
const { DirectoryTree } = Tree;

export default function App() {
  const [theme, setTheme] = useState<Theme>('hermes');
  const [showIcon, setShowIcon] = useState(true);
  const [showLine, setShowLine] = useState(false);
  const [checkable, setCheckable] = useState(false);

  const treeData: TreeDataNodeExt[] = [
    {
      title: 'parent 0',
      key: '0-0',
      icon: <FolderFilled />,
      more: {
        menu: {
          items: [
            {
              label: '新增',
              onClick: ({ key, domEvent }) => {
                domEvent.stopPropagation();
                console.log(key);
              },
              key: 'add',
            },
            {
              label: '编辑',
              onClick: ({ key, domEvent }) => {
                domEvent.stopPropagation();
                console.log(key);
              },
              key: 'edit',
            },
            {
              label: '删除',
              // label: <ButtonExt type="text" danger>删除</ButtonExt>,
              onClick: ({ key, domEvent }) => {
                domEvent.stopPropagation();
                console.log(key);
              },
              key: 'delete',
            },
          ],
        },
      },
      children: [
        {
          title: 'parent 0-0',
          key: '0-0-0',
          icon: ({ selected }) => (selected ? <FrownFilled /> : <SmileOutlined />),
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              icon: <FileFilled />,
              disableCheckbox: true,
              disabled: true,
            },
          ],
        },
        {
          title: 'parent 0-1',
          key: '0-0-1',
          children: [
            {
              title: 'leaf',
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
    {
      title: <span>parent 1</span>,
      key: '1-0',
      children: [],
      icon: <FileFilled />,
    },
  ];

  return (
    <div>
      {/* <div>
        <Radio.Group
          value={theme}
          style={{ marginBottom: 24 }}
          buttonStyle="solid"
          onChange={e => setTheme(e.target.value)}
        >
          <Radio.Button value="hermes">hermes</Radio.Button>
          <Radio.Button value="default">default</Radio.Button>
        </Radio.Group>
      </div> */}
      <Form layout="inline">
        <Form.Item label="是否展示TreeNode前的自定义图标">
          <Switch checked={showIcon} onChange={() => setShowIcon(!showIcon)} />
        </Form.Item>
        <Form.Item label="是否展示连接线">
          <Switch checked={showLine} onChange={() => setShowLine(!showLine)} />
        </Form.Item>
        <Form.Item label="节点前添加 Checkbox 复选框">
          <Switch checked={checkable} onChange={() => setCheckable(!checkable)} />
        </Form.Item>
      </Form>
      <Row gutter={24}>
        <Col span={8}>
          <Card title="zeus" style={{ marginBottom: 24 }}>
            <TreeExt
              theme={'zeus'}
              showIcon={showIcon}
              treeData={treeData}
              showLine={showLine}
              checkable={checkable}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="hermes" style={{ marginBottom: 24 }}>
            <TreeExt
              theme={'hermes'}
              showIcon={showIcon}
              treeData={treeData}
              showLine={showLine}
              checkable={checkable}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="default" style={{ marginBottom: 24 }}>
            <TreeExt
              theme={'default'}
              showIcon={showIcon}
              treeData={treeData}
              showLine={showLine}
              checkable={checkable}
            />
          </Card>
        </Col>
      </Row>
      {/* <Tree treeData={treeData} /> */}
      {/* <DirectoryTree treeData={treeData} /> */}
    </div>
  );
}
