import { createFromIconfontCN } from '@ant-design/icons';
import { Button, ConfigProviderExt, LayoutExt, Space } from '@m-tools/antd-ext';
import React from 'react';
import logo from './logo.png';

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_4484456_l3b00arq9u.js'],
});

const menuData = [
  {
    key: '/first-level01',
    label: '一级菜单01',
    extra: <div>hhhhh</div>,
    children: [
      {
        key: '/first-level01/second-level01',
        label: '二级菜单二级菜单二级菜单',
        icon: <IconFont type="icon-moxingpice" />,
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
        icon: <IconFont type="icon-Promptbianpai" />,
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
        title: '一级菜单01',
      },
    ],
  },
  {
    key: '/first-level03',
    label: '一级菜单03',
  },
  {
    key: '/first-level04',
    label: '一级菜单04',
  },
  {
    key: '/first-level05',
    label: '一级菜单05',
  },
  {
    key: '/first-level06',
    label: '一级菜单06',
  },
  {
    key: '/first-level07',
    label: '一级菜单07',
  },
  {
    key: '/first-level08',
    label: '一级菜单08',
  },
  {
    key: '/first-level09',
    label: '一级菜单09',
  },
  {
    key: '/first-level10',
    label: '一级菜单10',
  },
  {
    key: '/first-level13',
    label: '一级菜单13',
  },
  {
    key: '/first-level13',
    label: '一级菜单113',
  },
  {
    key: '/first-level23',
    label: '一级菜单23',
  },
  {
    key: '/first-level33',
    label: '一级菜单33',
  },
  {
    key: '/first-level43',
    label: '一级菜单43',
  },
  {
    key: '/first-level53',
    label: '一级菜单53',
  },
  {
    key: '/first-level63',
    label: '一级菜单63',
  },
  {
    key: '/first-level73',
    label: '一级菜单73',
  },
];

function Page() {
  console.log('renderpage.................................');
  const { activeNav, addTab, activeMenu, setOpenKey, removeTab } = LayoutExt.useLayout();
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
      <LayoutExt
        collapsible
        setTitle={({ collapsed }) =>
          collapsed ? <span style={{ color: '#fff' }}>Zues</span> : <img src={logo} />
        }
        menu={menuData}
        headerExtra={<div style={{ color: '#fff' }}>开发人员</div>}
        defaultActiveMenu="/first-level02/second-level02/third-level01"
        onSelect={() => console.log('onSelect========================')}
      >
        <Page />
      </LayoutExt>
    </ConfigProviderExt>
  );
}
