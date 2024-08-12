import { css } from '@emotion/css';
import type { GlobalToken, MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import type { ItemType, MenuItemGroupType, SubMenuType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CloseOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '../icon';
import { usePrefixCls } from '../utils';

const { Header, Content, Sider } = Layout;

/**
 * 以层序遍历打平树结构
 * @param tree
 * @returns 所有结点的数组
 */
export type typeBaseTreeNode<T> = T & { children?: typeBaseTreeNode<T>[] };

const headerExtraStyle = (token: GlobalToken, prefixCls: string) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export interface ITab {
  code: string | number;
  label: string;
}

export interface LayoutExtProps<IMenuInfo extends IBaseMenuInfo = IBaseMenuInfo> {
  menu: IMenuInfo[];
  openKeys: string[];
  selectedKeys: string[];
  children?: React.ReactNode;
  className?: string;
  setOpenKeys: (openKeys: string[]) => void;
  setSelectedKeys: (selectedKeys: string[]) => void;
  setTitle?: (props: { collapsed: boolean }) => React.ReactNode;
  headerExtra?: React.ReactNode;
  history: any;
  needMenuGroup?: boolean;
  headerContent?: ReactNode | false;
  siderWidth?: number;
  tabs?: ITab[];
  tabActive?: string | number;
  onTabClick: (key: string | number) => void;
  onTabRemove: (key: string | number) => void;
}

export interface IBaseMenuInfo {
  icon?: ReactNode;
  children?: IBaseMenuInfo[];
  url?: string;
  name?: React.ReactNode;
  [key: string]: any;
}

export function TriggerElement(props: {
  collapsed: boolean;
  onClick: () => void;
  style: React.CSSProperties;
}) {
  const { collapsed, style, onClick } = props;
  return collapsed ? (
    <MenuUnfoldOutlined onClick={onClick} style={style} />
  ) : (
    <MenuFoldOutlined onClick={onClick} style={style} />
  );
}

const tabStyle = (token: GlobalToken, prefixCls: string, mtPrefixCls: string) => css`
  &.${prefixCls}-${mtPrefixCls}-tabs {
    display: flex;
    flex: 1;
    gap: 4px;
    align-items: center;
    padding: 8px 0;
    overflow: auto;
  }
`;

const tabItemStyle = css`
  height: 32px;
  min-width: 100px;
  line-height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #646a73;
  border-radius: 20px;
  font-size: 14px;
  span:last-child {
    display: none;
  }
  &:hover {
    color: #646a73;
    background: #f2f3f5;

    span:first-child {
      margin-left: 6px;
    }

    span:last-child {
      display: inline-flex;
    }
  }
`;

const tabItemActiveStyle = css`
  background: #eff4ff !important;
  color: #3370ff !important;
  span:first-child {
    margin-left: 6px;
  }
  span:last-child {
    display: inline-flex;
  }
`;

const popupMenuStyle = (prefixCls: string) => css`
  .${prefixCls}-menu-title-content {
    display: inline-block;
  }
`;

function TabItem(props: {
  activeUrl: string | number;
  url: string | number;
  children: React.ReactNode;
  showRemoveIcon: boolean;
  history?: any;
  onSelect: (key: string | number) => void;
  onRemove: (key: string | number) => void;
}) {
  const { activeUrl, url, children, showRemoveIcon, history, onRemove, onSelect } = props;
  const refSpan = useRef<HTMLSpanElement>(null);

  const isActive = activeUrl === url;

  const classes = classNames([tabItemStyle, isActive ? tabItemActiveStyle : '']);

  const _onRemove: React.MouseEventHandler<HTMLSpanElement> = useCallback(
    e => {
      e.stopPropagation();
      onRemove(url);
    },
    [onRemove, url],
  );

  const _onSelect = useCallback(() => {
    onSelect(url);
    if (history) {
      history.push(url);
    }
  }, [onSelect, history, url]);

  return (
    <div className={classes} onClick={_onSelect} id={url + ''}>
      <span style={!showRemoveIcon ? { marginLeft: 0 } : {}} ref={refSpan}>
        {children}
      </span>
      {showRemoveIcon ? (
        <CloseOutlined style={{ fontSize: 10, padding: 6 }} onClick={_onRemove} />
      ) : null}
    </div>
  );
}

export default function AppLayoutExt<IMenuInfo extends IBaseMenuInfo>(
  props: LayoutExtProps<IMenuInfo>,
): JSX.Element {
  const {
    tabs,
    tabActive,
    onTabClick,
    onTabRemove,
    headerExtra,
    menu,
    children,
    openKeys,
    selectedKeys,
    className,
    needMenuGroup = true,
    headerContent,
    siderWidth,
    setOpenKeys,
    setSelectedKeys,
    setTitle,
  } = props;
  const [collapsed, setCollapsed] = useState(false);

  const { token, prefixCls, mtPrefixCls } = usePrefixCls();

  useEffect(() => {
    try {
      setTimeout(() => {
        document.getElementById(tabActive + '')?.scrollIntoView({
          block: 'nearest',
        });
      });
    } catch (error) {}
  }, [tabActive]);

  const bindMenu: (data: { menu?: IBaseMenuInfo; isGroup: boolean }) => ItemType = useCallback(
    (data: { menu?: IBaseMenuInfo; isGroup: boolean }) => {
      const { menu: _menu, isGroup } = data;
      if (!(_menu && Object.keys(_menu).length > 0)) {
        return null;
      }

      const base = {
        key: _menu.url,
        children:
          _menu.children && _menu.children.length > 0
            ? _menu.children.map(subMenuItem =>
                bindMenu({
                  menu: subMenuItem,
                  isGroup: false,
                }),
              )
            : undefined,
        label: _menu.name,
      };

      if (isGroup) {
        return {
          type: 'group',
          ...base,
        } as MenuItemGroupType;
      }

      return {
        popupClassName: popupMenuStyle(prefixCls),
        icon: _menu.icon,
        ...base,
        label: _menu.name,
      } as SubMenuType;
    },
    [prefixCls],
  );

  const menuItems = useMemo(
    () =>
      menu && menu.length > 0
        ? menu.map(item => bindMenu({ isGroup: needMenuGroup, menu: item }))
        : undefined,
    [menu, bindMenu, needMenuGroup],
  );

  const onCollapse = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const onSelect = useCallback(
    (data: Parameters<MenuProps['onSelect']>[number]) => {
      const { key, selectedKeys: _selectedKeys } = data;
      setSelectedKeys(_selectedKeys);
      props.history.push(key);
    },
    [props.history, setSelectedKeys],
  );

  return (
    <Layout style={{ height: '100%' }} className={className}>
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        width={siderWidth || 180}
        trigger={
          <TriggerElement collapsed={collapsed} onClick={onCollapse} style={{ fontSize: 20 }} />
        }
        collapsedWidth={52}
        style={{
          height: '100%',
        }}
      >
        <div
          style={{ height: token.controlHeight * 2 }}
          className={`${prefixCls}-${mtPrefixCls}-sider-header`}
        >
          {setTitle ? setTitle({ collapsed }) : null}
        </div>
        <Menu
          style={{ overflowY: 'auto' }}
          theme="light"
          mode="inline"
          openKeys={openKeys}
          inlineIndent={16}
          selectedKeys={selectedKeys}
          items={menuItems}
          onOpenChange={setOpenKeys}
          onSelect={onSelect}
        />
      </Sider>
      <Layout>
        <Header
          style={{ backgroundColor: token.colorBgContainer }}
          className={headerExtraStyle(token, prefixCls)}
        >
          {headerContent ? (
            <div>{headerContent}</div>
          ) : (
            <div
              className={classNames([
                `${prefixCls}-${mtPrefixCls}-tabs`,
                tabStyle(token, prefixCls, mtPrefixCls),
              ])}
            >
              {tabs.map((item: ITab) => {
                return (
                  <TabItem
                    key={item.code}
                    activeUrl={tabActive}
                    url={(item.code as string) || ''}
                    showRemoveIcon={tabs.length > 1}
                    onSelect={(key: string) => onTabClick(key)}
                    onRemove={onTabRemove}
                    history={props.history}
                  >
                    {item.label}
                  </TabItem>
                );
              })}
            </div>
          )}
          {headerExtra}
        </Header>
        <Content style={{ overflow: 'auto' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
