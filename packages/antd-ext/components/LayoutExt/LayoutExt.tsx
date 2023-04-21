import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Layout, Menu,
} from 'antd';
import {
  MenuFoldOutlined, MenuUnfoldOutlined, CloseOutlined,
} from '../icon';
import type { ItemType, MenuItemGroupType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import { usePrefixCls } from '../utils';
import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import classNames from 'classnames';

const { Header, Content, Sider } = Layout;

/**
 * 以层序遍历打平树结构
 * @param tree 
 * @returns 所有结点的数组
 */
export type typeBaseTreeNode<T> = T & { children?: typeBaseTreeNode<T>[] };
function levelOrder<T>(tree: typeBaseTreeNode<T>): T[] {
  if (tree === null) {
    return [];
  }

  const res = [];
  let stack = [tree];
  while (stack.length) {
    const item = stack.shift();
    if (item && item.children && item.children.length > 0) {
      stack = [...stack, ...item.children] as typeBaseTreeNode<T>[];
    }

    if (item) {
      Reflect.deleteProperty(item, 'children');
      res.push(item);
    }
  }

  return res;
}

const headerExtraStyle = (token: GlobalToken, prefixCls: string) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export interface LayoutExtProps<IMenuInfo extends IBaseMenuInfo = IBaseMenuInfo> {
  menu: IMenuInfo[];
  openKeys: string[];
  selectedKeys: string[];
  children?: React.ReactNode;
  className?: string;
  setOpenKeys: (openKeys: string[]) => void;
  setSelectedKeys: (selectedKeys: string[]) => void;
  setTitle?: (props: { collapsed: boolean; }) => React.ReactNode;
  headerExtra?: React.ReactNode;
  history: any;
  needMenuGroup?: boolean;
  headerContent?: ReactNode | false;
}

export interface IBaseMenuInfo {
  icon?: ReactNode;
  children?: IBaseMenuInfo[];
  url?: string;
  name?: React.ReactNode;
  [key: string]: any;
}

function TriggerElement(props: {
  collapsed: boolean;
  onClick: () => void;
  style: React.CSSProperties;
}) {
  const { collapsed, style, onClick } = props;
  return collapsed
    ? <MenuUnfoldOutlined onClick={onClick} style={style} />
    : <MenuFoldOutlined onClick={onClick} style={style} />;
}

const tabStyle = (token: GlobalToken, prefixCls: string, mtPrefixCls: string) => css`
  &.${prefixCls}-${mtPrefixCls}-tabs {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 8px 0;
    overflow: auto;
    gap: 4px;
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
  color: #646A73;
  border-radius: 20px;
  font-size: 14px;
  span:last-child {
    display: none;
  }
  &:hover {
    background: #F2F3F5;
    color: #646A73;

    span:first-child {
      margin-left: 6px;
    }

    span:last-child {
      display: inline-flex;
    }
  }
`;

const tabItemActiveStyle = css`
  background: #EFF4FF !important;
  color: #3370FF !important;
  span:first-child {
    margin-left: 6px;
  }
  span:last-child {
    display: inline-flex;
  }
`;

const popupMenuStyle = (prefixCls: string,) => css`
  .${prefixCls}-menu-title-content {
    display: inline-block;
  }
`

function TabItem(props: {
  activeUrl: string;
  url: string;
  children: React.ReactNode;
  showRemoveIcon: boolean;
  history?: any;
  onSelect: (key: string) => void;
  onRemove: (key: string) => void;
}) {
  const { activeUrl, url, children, showRemoveIcon, history, onRemove, onSelect } = props;
  const refSpan = useRef<HTMLSpanElement>(null);
  
  const isActive = activeUrl === url;

  const classes = classNames([
    tabItemStyle,
    isActive ? tabItemActiveStyle : '',
  ]);

  const _onRemove: React.MouseEventHandler<HTMLSpanElement> = useCallback((e) => {
    e.stopPropagation();
    onRemove(url);
  }, [onRemove, url]);

  const _onSelect = useCallback(() => {
    onSelect(url);
    if (history) {
      history.push(url);
    }
  }, [onSelect]);

  return (
    <div className={classes} onClick={_onSelect}>
      <span style={!showRemoveIcon ? { marginLeft: 0 } : {}} ref={refSpan}>{children}</span>
      {
        showRemoveIcon ? (
          <CloseOutlined
            style={{ fontSize: 10, padding: 6 }}
            onClick={_onRemove}
          />
        ) : null
      }
    </div>
  );
}

export default function AppLayoutExt<IMenuInfo extends IBaseMenuInfo>(
  props: LayoutExtProps<IMenuInfo>,
): JSX.Element {
  const {
    headerExtra,
    menu,
    children,
    openKeys,
    selectedKeys,
    className,
    needMenuGroup = true,
    headerContent,
    setOpenKeys,
    setSelectedKeys,
    setTitle,
  } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [cachedMenuItems, setCachedMenuItems] = useState<string[]>([]);

  const bindMenu: (data: {
    menu?: IBaseMenuInfo;
    isGroup: boolean;
  }) => ItemType = useCallback((data: {
    menu?: IBaseMenuInfo;
    isGroup: boolean;
  }) => {
    const { menu, isGroup } = data;
    if (!(menu && Object.keys(menu).length > 0)) {
      return null;
    }

    const base = {
      key: menu.url,
      children: menu.children && menu.children.length > 0
        ? menu.children.map((subMenuItem) => bindMenu({
          menu: subMenuItem,
          isGroup: false,
        }))
        : undefined,
      label: menu.name,
    }

    if (isGroup) {
      return {
        type: 'group',
        ...base,
      } as MenuItemGroupType;
    }

    return {
      popupClassName: popupMenuStyle(prefixCls),
      icon: menu.icon,
      ...base,
      label: menu.children && menu.children.length > 0 ? menu.name : <div onClick={() => props.history.push(menu.url)}>{menu.name}</div>,
    } as SubMenuType;
  }, []);

  const menuItems = useMemo(() => (menu && menu.length > 0
    ? menu.map((item) => bindMenu({ isGroup: needMenuGroup, menu: item }))
    : undefined), [menu]);

  const onCollapse = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const { token, prefixCls, mtPrefixCls } = usePrefixCls();

  const simpleMenu: IBaseMenuInfo[] = useMemo(() => menu.reduce((pre, cur) => {
    return [...pre, ...levelOrder(cur)];
  }, [] as IBaseMenuInfo[]), [menu]);

  useEffect(() => {
    if (headerContent === false) {
      return;
    }
    const menuItems: string[] = JSON.parse(window.sessionStorage.getItem('mt-antdext-cached-menu-item') || '[]');
    setCachedMenuItems(menuItems.length > 0 ? menuItems : selectedKeys);
  }, [selectedKeys, headerContent])

  const onSelect = useCallback((data: { selectedKeys: string[]; }) => {
    const { selectedKeys: _selectedKeys } = data;
    if (_selectedKeys.length > 0 && cachedMenuItems.includes(_selectedKeys[0])) {
      setSelectedKeys(_selectedKeys);
      return;
    }
    window.sessionStorage.setItem('mt-antdext-cached-menu-item', JSON.stringify([...cachedMenuItems, ..._selectedKeys]));
    setCachedMenuItems([...cachedMenuItems, ..._selectedKeys]);
    setSelectedKeys(_selectedKeys);
  }, [cachedMenuItems]);

  const onRemove = useCallback((key: string) => {
    const index = cachedMenuItems.findIndex((item) => item === key);
    if (index > -1) {
      cachedMenuItems.splice(index, 1);
      window.sessionStorage.setItem('mt-antdext-cached-menu-item', JSON.stringify([...cachedMenuItems]));
      setCachedMenuItems([...cachedMenuItems]);
      const lastEle = cachedMenuItems[cachedMenuItems.length - 1];
      setSelectedKeys([lastEle]);
      props.history.push(lastEle);
    }
  }, [cachedMenuItems]);

  return (
    <Layout style={{ height: '100%' }} className={className}>
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        width={180}
        trigger={(
          <TriggerElement
            collapsed={collapsed}
            onClick={onCollapse}
            style={{ fontSize: 20 }}
          />
        )}
        collapsedWidth={52}
        style={{
          height: '100%',
        }}
      >
        <div style={{ height: token.controlHeight * 2 }} className={`${prefixCls}-${mtPrefixCls}-sider-header`}>
          {
            setTitle ? setTitle({ collapsed }) : null
          }
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
        <Header style={{ backgroundColor: token.colorBgContainer }} className={headerExtraStyle(token, prefixCls)}>
          {
            headerContent ? (
              <div>
                {headerContent}
              </div>
            ) : (
              <div
                className={
                  classNames([
                    `${prefixCls}-${mtPrefixCls}-tabs`,
                    tabStyle(token, prefixCls, mtPrefixCls),
                  ])}
              >
                {
                  cachedMenuItems.map((item: string) => {
                    const ele = simpleMenu.find((_menuItem) => item === _menuItem.url);
                    return (
                      <TabItem
                        key={ele?.url}
                        activeUrl={selectedKeys.length > 0 ? selectedKeys[0] : ''}
                        url={ele?.url || ''}
                        showRemoveIcon={cachedMenuItems.length > 1 ? true : false}
                        onSelect={(key: string) => onSelect({ selectedKeys: [key] })}
                        onRemove={(key: string) => onRemove(key)}
                        history={props.history}
                      >
                        {ele?.name}
                      </TabItem>
                    );
                  })
                }
              </div>
            )
          }
          {headerExtra}
        </Header>
        <Content style={{ overflow: 'auto' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
