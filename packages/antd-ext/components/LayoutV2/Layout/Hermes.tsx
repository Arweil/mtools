import type { SiderProps } from 'antd';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { usePrefixCls } from '../../utils';
import TabItem from '../components/TabItem';
import TriggerElement from '../components/TriggerElement';
import { LayoutContext } from '../context';
import useMenu from '../hooks/useMenu';
import { headerExtraStyle, tabStyle } from '../styles/layoutHermes';
import type { LayoutProps } from '../types';

const { Sider, Header, Content } = Layout;

const LayoutHermes: React.FC<LayoutProps> = props => {
  const {
    className,
    collapsible = true,
    collapsedWidth = 52,
    onCollapse,
    siderWidth = 180,
    trigger,
    children,
    headerExtra,
    setTitle,
    headerContent,
  } = props;
  const { token, prefixCls, mtPrefixCls } = usePrefixCls();
  const [collapsed, setCollapsed] = useState(false);
  const {
    activeNav,
    menu,
    openKeys,
    selectedMenu,
    onSelectedMenu,
    onMenuOpenChange,
    activeMenu,
    tabbar,
    selectedTabbar,
    onSelectTarbar,
    addTab,
    removeTab,
    setOpenKey,
  } = useMenu(props);

  const layoutProviderValue = useMemo(
    () => ({
      activeNav,
      activeMenu,
      addTab,
      removeTab,
      setOpenKey,
    }),
    [activeNav, activeMenu, addTab, removeTab, setOpenKey],
  );

  const onInnerCollapse: SiderProps['onCollapse'] = (_collapsed, type) => {
    onCollapse?.(_collapsed, { type, siderWidth, collapsedWidth });
  };

  return (
    <LayoutContext.Provider value={layoutProviderValue}>
      <Layout style={{ height: '100%' }} className={className}>
        <Sider
          collapsible={collapsible}
          theme="light"
          collapsed={collapsed}
          width={siderWidth}
          trigger={
            <TriggerElement
              collapsed={collapsed}
              trigger={trigger}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 20 }}
            />
          }
          collapsedWidth={collapsedWidth}
          style={{ height: '100%' }}
          onCollapse={onInnerCollapse}
        >
          <div
            style={{ height: token.controlHeight * 2 }}
            className={`${prefixCls}-${mtPrefixCls}-sider-header`}
          >
            {setTitle?.({ collapsed })}
          </div>
          <Menu
            style={{ overflowY: 'auto' }}
            theme="light"
            mode="inline"
            openKeys={openKeys}
            inlineIndent={16}
            selectedKeys={selectedMenu}
            items={menu}
            onOpenChange={onMenuOpenChange}
            onClick={onSelectedMenu}
          />
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: token.colorBgContainer }} className={headerExtraStyle}>
            {headerContent ? (
              <div>{headerContent}</div>
            ) : (
              <div
                className={classNames([
                  `${prefixCls}-${mtPrefixCls}-tabs`,
                  tabStyle(token, prefixCls, mtPrefixCls),
                ])}
              >
                {tabbar.map(item => {
                  return (
                    <TabItem
                      key={item.key}
                      activeUrl={selectedTabbar}
                      url={(item.key as string) || ''}
                      showRemoveIcon={tabbar.length > 1}
                      onSelect={(key: string) => onSelectTarbar(key)}
                      onRemove={removeTab}
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
    </LayoutContext.Provider>
  );
};

export default LayoutHermes;
