import { AccountBookOutlined } from '@ant-design/icons';
import { Button, ConfigProviderExt, LayoutV2, Space } from '@m-tools/antd-ext';
import React from 'react';
import logo from './logo.png';

const menuData = [
  {
    key: '/first-level01',
    label: '一级菜单01',
    children: [
      {
        key: '/first-level01/second-level01',
        label: '二级菜单01',
        icon: <AccountBookOutlined />,
        children: [
          {
            key: '/first-level01/second-level01/third-level01',
            label: '三级菜单01',
          },
          {
            key: '/first-level01/second-level01/third-level02',
            label: '三级菜单02',
          },
        ],
      },
      {
        key: '/first-level01/second-level02',
        label: '二级菜单02',
        children: [
          {
            key: '/first-level01/second-level02/third-level01',
            label: '三级菜单01',
          },
        ],
      },
    ],
  },
  {
    key: '/first-level02',
    label: '一级菜单02',
    children: [
      {
        key: '/first-level02/second-level01',
        label: '二级菜单01',
        children: [
          {
            key: '/first-level02/second-level02/third-level01',
            label: '三级菜单01',
          },
        ],
      },
      {
        key: '/first-level02/second-level02',
        label: '二级菜单02',
      },
    ],
  },
  {
    key: '/first-level03',
    label: '一级菜单03',
  },
];

function Page() {
  console.log('renderpage.................................');
  const { activeNav, addTab, activeMenu, setOpenKey, removeTab } = LayoutV2.useLayout();
  const [count, setCount] = React.useState(0);

  return (
    <Space style={{ marginBlock: 20 }}>
      <Button type="primary" onClick={() => activeNav('/first-level02')}>
        activeNav 激活导航栏
      </Button>
      <Button type="primary" onClick={() => setOpenKey('/first-level02/second-level01')}>
        setOpenKey 展开菜单
      </Button>
      <Button
        type="primary"
        onClick={() => activeMenu('/first-level01/second-level02/third-level01')}
      >
        activeMenu 激活菜单
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setCount(pre => {
            return pre + 1;
          });
          addTab({ key: `lllll${count}`, label: `tab${count}` });
        }}
      >
        addTab 添加Tab
      </Button>
      <Button
        type="primary"
        onClick={() => {
          removeTab(`lllll${count - 1}`);
        }}
      >
        removeTab 移除Tab
      </Button>
    </Space>
  );
}

export default function Index() {
  return (
    <ConfigProviderExt prefixCls="ant-ext-zeus" themeExt="zeus">
      <LayoutV2
        collapsible
        logo={collapsed =>
          collapsed ? <span style={{ color: '#fff' }}>Zues</span> : <img src={logo} />
        }
        menu={menuData}
        extra={<div style={{ color: '#fff' }}>开发人员</div>}
        defaultActiveMenu="/first-level02/second-level02/third-level01"
        onSelect={() => {}}
      >
        <Page />
      </LayoutV2>
    </ConfigProviderExt>
  );
}
