import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layout, Menu, Dropdown, Avatar,
} from 'antd';
import {
  MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, LogoutOutlined, UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

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

export default function AppLayout<IMenuInfo extends IBaseMenuInfo>(props: IAppLayoutProps<IMenuInfo>) {
  const {
 userName, menu, userMenu, setTitle, onMenuItemClick 
} = props;
  const [collapsed, setCollapsed] = useState(false);

  function bindMenu(menu?: IBaseMenuInfo) {
    return menu && Object.keys(menu).length > 0 ? (
      <SubMenu
        key={menu.url}
        title={
          <span>
            {
              menu.icon
            }
            <span>
              {menu.name}
            </span>
          </span>
        }
      >
        {
          menu.children && menu.children.map((subMenuItem) => {
            if (subMenuItem.children && subMenuItem.children.length) {
              return bindMenu(subMenuItem);
            } else {
              return subMenuItem.url ? (
                <Menu.Item key={subMenuItem.url}>
                  <Link to={subMenuItem.url}>{subMenuItem.name}</Link>
                </Menu.Item>
              ) : null
            }
          })
        }
      </SubMenu>
    ) : null
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
          mode="inline">
          {
            menu && menu.length > 0 ? menu.map(item => bindMenu(item)) : null
          }
        </Menu>
      </Sider>
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Header style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 4px 0px' }}>
          {
            React.createElement(collapsed ? MenuFoldOutlined : MenuUnfoldOutlined, { onClick: onCollapse, style: { fontSize: 20 } })
          }
          <div style={{ display: 'inline-block', float: 'right' }}>
            <Dropdown placement="bottomRight" overlay={(
              <Menu onClick={onMenuItemClick}>
                {
                  userMenu && userMenu.length > 0 ? userMenu.map(item => item) : (
                    <React.Fragment>
                      <Menu.Item key="modify">
                        <SettingOutlined style={{ marginRight: 8 }} />
                        修改密码
                      </Menu.Item>
                      <Menu.Item key="logout">
                        <LogoutOutlined style={{ marginRight: 8 }} />
                        退出登录
                      </Menu.Item>
                    </React.Fragment>
                  )
                }
              </Menu>
            )}>
              <div style={{ cursor: 'pointer' }}>
                <Avatar size={32} style={{ backgroundColor: '#CEE4F8' }} icon={<UserOutlined />} />
                <span style={{ paddingLeft: 12 }}>{userName}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <div style={{ overflowY: 'auto' }}>
          <Content style={{ padding: 12 }}>
            {props.children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}
