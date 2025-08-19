import { cx } from '@emotion/css';
import type { SiderProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useMemo, useState } from 'react';
import { usePrefixCls } from '../../utils';
import TabBar from '../components/TabBar';
import TriggerElement from '../components/TriggerElement';
import { LayoutContext } from '../context';
import useMenu from '../hooks/useMenu';
import { headerExtraStyle, tabbarStyle } from '../styles/layoutHermes';
import type { LayoutProps } from '../types';
import { processHermesMenuLabels } from '../utils';

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
  const [canScroll, setCanScroll] = useState(false);
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
  } = useMenu(props, collapsed);

  // 处理菜单标签，Hermes主题特殊处理
  const menuByCollapsed = useMemo(
    () => processHermesMenuLabels(menu, collapsed),
    [menu, collapsed],
  );

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

  const tabbarContent = headerContent || (
    <TabBar
      styles={tabbarStyle}
      tabbar={tabbar}
      selected={selectedTabbar}
      showScrollBtn={false}
      onSelect={onSelectTarbar}
      onRemove={removeTab}
      onCanScroll={setCanScroll}
    />
  );

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
            mode="inline"
            openKeys={openKeys}
            inlineIndent={16}
            selectedKeys={selectedMenu}
            items={menuByCollapsed}
            onOpenChange={onMenuOpenChange}
            onClick={onSelectedMenu}
          />
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: token.colorBgContainer }} className={headerExtraStyle}>
            {tabbarContent}
            {headerExtra && (
              <div
                className={cx(`${prefixCls}-${mtPrefixCls}-header-extra-wrap`, {
                  canScroll,
                })}
              >
                {headerExtra}
              </div>
            )}
          </Header>
          <Content style={{ overflow: 'auto' }}>{children}</Content>
        </Layout>
      </Layout>
    </LayoutContext.Provider>
  );
};

export default LayoutHermes;
