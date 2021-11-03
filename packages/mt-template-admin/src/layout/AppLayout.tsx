import React, { ReactNode, useState } from 'react';
import { Link } from 'malganis/router';
import {
  Layout, Menu, Dropdown, Avatar,
} from 'antd';
import {
  MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, LogoutOutlined, UserOutlined,
} from '@ant-design/icons';
import AppBreadcrumb from './AppBreadcrumb';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export interface MenuInfo {
  key: string;
  keyPath: string[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

interface IAppLayoutProps<IMenuInfo extends IBaseMenuInfo> {
  menu: IMenuInfo[];
  userName: string;
  userMenu?: (typeof Menu.Item)[];
  setTitle?: (props: { collapsed: boolean; }) => React.ReactNode;
  onMenuItemClick?: (info: {}) => void;
  children?: React.ReactNode;
}

export interface IBaseMenuInfo {
  icon?: ReactNode;
  children?: IBaseMenuInfo[];
  url?: string;
  name?: string;
  [key: string]: any;
}

function AppLayout<IMenuInfo extends IBaseMenuInfo>(
  props: IAppLayoutProps<IMenuInfo>,
): JSX.Element {
  const {
    userName, menu, userMenu, setTitle, children, onMenuItemClick,
  } = props;
  const [collapsed, setCollapsed] = useState(false);
  const list = window.location.pathname
    .split('/')
    .filter((i) => i);
  const [openKeys, setOpenKeys] = useState(
    list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`).slice(0, list.length - 1),
  );
  const [selectedKeys, setSelectedKeys] = useState([window.location.pathname]);

  function bindMenu(_menu?: IBaseMenuInfo): JSX.Element | null {
    return _menu && Object.keys(_menu).length > 0 ? (
      <SubMenu
        key={_menu.url}
        title={(
          <span>
            {
              _menu.icon
            }
            <span>
              {_menu.name}
            </span>
          </span>
        )}
      >
        {
          _menu.children && _menu.children.map((subMenuItem) => {
            if (subMenuItem.children && subMenuItem.children.length) {
              return bindMenu(subMenuItem);
            }

            return subMenuItem.url ? (
              <Menu.Item key={subMenuItem.url}>
                <Link to={subMenuItem.url}>{subMenuItem.name}</Link>
              </Menu.Item>
            ) : null;
          })
        }
      </SubMenu>
    ) : null;
  }

  function onCollapse(): void {
    setCollapsed(!collapsed);
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: '100%',
        }}
      >
        <div style={{ height: 56, backgroundColor: '#002140' }}>
          {
            setTitle ? setTitle({ collapsed }) : null
          }
        </div>
        <Menu
          style={{ overflowY: 'auto', height: window.innerHeight - 56 }}
          theme="dark"
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={setOpenKeys}
          onSelect={({ selectedKeys: _selectedKeys }) => setSelectedKeys(_selectedKeys)}
        >
          {
            menu && menu.length > 0 ? menu.map((item) => bindMenu(item)) : null
          }
        </Menu>
      </Sider>
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Header style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 4px 0px' }}>
          {
            React.createElement(
              collapsed
                ? MenuFoldOutlined
                : MenuUnfoldOutlined,
              { onClick: onCollapse, style: { fontSize: 20 } },
            )
          }
          <div style={{ display: 'inline-block', float: 'right' }}>
            <Dropdown
              placement="bottomRight"
              overlay={(
                <Menu
                  onClick={onMenuItemClick}
                >
                  {
                    userMenu && userMenu.length > 0
                      ? userMenu.map((item) => item)
                      : (
                        <>
                          <Menu.Item key="modify">
                            <SettingOutlined style={{ marginRight: 8 }} />
                            修改密码
                          </Menu.Item>
                          <Menu.Item key="logout">
                            <LogoutOutlined style={{ marginRight: 8 }} />
                            退出登录
                          </Menu.Item>
                        </>
                      )
                  }
                </Menu>
              )}
            >
              <div style={{ cursor: 'pointer' }}>
                <Avatar size={32} style={{ backgroundColor: '#CEE4F8' }} icon={<UserOutlined />} />
                <span style={{ paddingLeft: 12 }}>{userName}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <div className="content-scroll" style={{ overflowY: 'auto' }}>
          <Content style={{ padding: 12 }}>
            <AppBreadcrumb menu={menu} />
            {children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}

export default AppLayout;

AppLayout.defaultProps = {
  userMenu: [],
  setTitle: () => null,
  onMenuItemClick: () => undefined,
  children: null,
};
