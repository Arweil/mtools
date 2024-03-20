import { CloseOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { ConfigProvider, Flex, Layout, Menu } from 'antd';
import type { ItemType, MenuItemGroupType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePrefixCls } from '../utils';
import type { IBaseMenuInfo, LayoutExtProps } from './LayoutHermesExt';
import { TriggerElement } from './LayoutHermesExt';

const { Header, Content, Sider } = Layout;

const logo = (siderWidth?: number) => css`
  width: ${siderWidth}px;
  height: 100%;
`;

const tabItemActiveStyle = css`
  > span {
    color: #016eff !important;
  }
  font-weight: 500;
  background: #d6e5ff;
  border-radius: 8px 8px 0 0;
  &::before {
    position: absolute;
    bottom: 0;
    left: -8px;
    display: block;
    width: 8px;
    height: 8px;
    background: radial-gradient(at 0px 0px, rgb(238, 244, 255) 8px, #d6e5ff 8px);
    content: ' ';
  }
  &::after {
    position: absolute;
    right: -8px;
    bottom: 0;
    display: block;
    width: 8px;
    height: 8px;
    background: radial-gradient(at 8px 0px, rgb(238, 244, 255) 8px, #d6e5ff 8px);
    content: ' ';
  }
  &:first-child {
    &::before {
      display: none;
    }
  }
`;

const tabItemStyle = css`
  position: relative;
  padding: 0px 10px 0px 16px;
  height: 32px;
  line-height: 32px;
  margin-top: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  > span {
    color: #333333;
    white-space: nowrap;
  }
`;

function TabItem(props: {
  tab: { code: string | number; label: string; isActive?: boolean };
  showRemoveIcon: boolean;
  onSelect: (key: string | number) => void;
  onRemove: (key: string | number) => void;
}) {
  const { tab, showRemoveIcon, onSelect, onRemove } = props;

  const classes = classNames(tabItemStyle, tab.isActive ? tabItemActiveStyle : undefined);

  const _onRemove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, code: string | number) => {
      e.stopPropagation();
      onRemove(code);
    },
    [onRemove],
  );

  return (
    <div className={classes} onClick={() => onSelect(tab.code)}>
      <span
        style={
          !showRemoveIcon
            ? { marginLeft: 0, fontSize: 12, lineHeight: '22px', display: 'inline-block' }
            : { fontSize: 12, lineHeight: '22px', display: 'inline-block' }
        }
      >
        {tab.label}
      </span>
      {showRemoveIcon ? (
        <CloseOutlined
          style={{ fontSize: 10, padding: 6, color: '#999999' }}
          onClick={e => _onRemove(e, tab.code)}
        />
      ) : null}
    </div>
  );
}

export default function LayoutZeusExt<IMenuInfo extends IBaseMenuInfo>(
  props: LayoutExtProps<IMenuInfo>,
) {
  const {
    headerExtra,
    menu,
    children,
    openKeys,
    selectedKeys,
    className,
    needMenuGroup = false,
    headerContent,
    siderWidth,
    setOpenKeys,
    setSelectedKeys,
    setTitle,
    tabs,
    onTabClick,
    onTabRemove,
  } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [firstLevelMenuKey, setFirstLevelMenuKey] = useState<string | undefined>(undefined);
  const [secondMenu, setSecondMenu] = useState<ItemType[]>([]);

  const { token, prefixCls, mtPrefixCls } = usePrefixCls();

  const finSiderWidth = collapsed ? 62 : siderWidth || 134;

  const firstLevelMenu = useMemo(() => {
    return menu.map(item => {
      return {
        key: item.url,
        label: item.name,
      } as SubMenuType;
    });
  }, [menu]);

  const onCollapse = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

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
        // popupClassName: popupMenuStyle(prefixCls),
        icon: _menu.icon,
        ...base,
        label:
          _menu.children && _menu.children.length > 0 ? (
            _menu.name
          ) : (
            <div onClick={() => props.history.push(_menu.url)}>{_menu.name}</div>
          ),
      } as SubMenuType;
    },
    [props.history],
  );

  const onSelect = useCallback(
    (data: { selectedKeys: string[] }) => {
      const { selectedKeys: _selectedKeys } = data;
      setSelectedKeys(_selectedKeys);
    },
    [setSelectedKeys],
  );

  const onFirstLevelMenuSelect = useCallback(
    ({ key }) => {
      const menus = menu.find(item => item.url === key)?.children || [];
      setSecondMenu(
        menus && menus.length > 0
          ? menus.map(item => bindMenu({ isGroup: needMenuGroup, menu: item }))
          : undefined,
      );
      setFirstLevelMenuKey(key);
    },
    [bindMenu, menu, needMenuGroup],
  );

  useEffect(() => {
    onFirstLevelMenuSelect({ key: '/Demo' });
  }, []);

  return (
    <Layout style={{ height: '100%' }} className={className}>
      <Header>
        <div className={logo(finSiderWidth)}>{setTitle ? setTitle({ collapsed }) : null}</div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                fontSize: 11,
                itemHoverColor: '#FFFFFF',
                itemColor: '#BBC0CC',
              },
            },
          }}
        >
          <Menu
            mode="horizontal"
            className={`${prefixCls}-${mtPrefixCls}-menu-header`}
            selectedKeys={[firstLevelMenuKey]}
            items={firstLevelMenu}
            style={{ flex: 1, minWidth: 0 }}
            onSelect={onFirstLevelMenuSelect}
          />
        </ConfigProvider>

        {headerExtra}
      </Header>
      <Layout>
        <Sider
          collapsible
          trigger={
            <TriggerElement collapsed={collapsed} onClick={onCollapse} style={{ fontSize: 12 }} />
          }
          collapsed={collapsed}
          width={finSiderWidth}
          collapsedWidth={62}
          onCollapse={setCollapsed}
        >
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  fontSize: 11,
                  itemHeight: 32,
                  itemSelectedBg: 'transparent',
                  itemHoverBg: '#DFEBFF',
                  itemColor: '#666666',
                  iconMarginInlineEnd: 4,
                  itemHoverColor: '#666666',
                  collapsedIconSize: 11,
                },
              },
            }}
          >
            <Menu
              className={`${prefixCls}-${mtPrefixCls}-menu`}
              style={{ overflowY: 'auto' }}
              mode="inline"
              openKeys={openKeys}
              inlineIndent={16}
              selectedKeys={selectedKeys}
              items={secondMenu}
              onOpenChange={setOpenKeys}
              onSelect={onSelect}
            />
          </ConfigProvider>
        </Sider>
        <Layout>
          {tabs && tabs.length > 0 ? (
            <div style={{ height: 36, backgroundColor: '#EEF4FF' }}>
              <Flex align="center" style={{ height: '100%', overflowY: 'auto' }}>
                {tabs.map(item => (
                  <TabItem tab={item} showRemoveIcon onSelect={onTabClick} onRemove={onTabRemove} />
                ))}
              </Flex>
            </div>
          ) : null}
          <Content style={{ overflow: 'auto', backgroundColor: '#D6E5FF', padding: 8 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
