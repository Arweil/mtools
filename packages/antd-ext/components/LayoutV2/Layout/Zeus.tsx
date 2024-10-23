import { ConfigProvider, Flex, Layout, Menu } from 'antd';
import React, { useMemo, useState } from 'react';
import { usePrefixCls } from '../../utils';
import TabBar from '../components/TabBar';
import TriggerElement from '../components/TriggerElement';
import { LayoutContext } from '../context';
import useMenu from '../hooks/useMenu';
import type { LayoutProps } from '../types';

const { Sider, Header, Content } = Layout;

const topMenuStyle = {
  components: {
    Menu: {
      fontSize: 12,
      itemHoverColor: '#FFFFFF',
      itemColor: '#BBC0CC',
      horizontalItemSelectedColor: '#fff',
    },
  },
};

const sideMenuStyle = {
  components: {
    Menu: {
      subMenuItemBg: 'transparent',
      itemSelectedBg: 'transparent',
      itemSelectedColor: '#016EFF',
      itemHoverBg: '#DFEBFF',
      itemColor: '#666666',
      fontSize: 12,
      iconSize: 12,
      itemMarginBlock: 0,
    },
  },
};

const LayoutZeus: React.FC<LayoutProps> = React.forwardRef((props, ref) => {
  const {
    className,
    collapsible,
    collapsedWidth = 62,
    defaultActiveMenu,
    extra,
    logo,
    menu: originMenu,
    onSelect,
    siderWidth = 134,
    trigger,
    children,
  } = props;
  const { prefixCls } = usePrefixCls();
  const [collapsed, setCollapsed] = useState(false);
  const {
    navbar,
    innerSelectedNav,
    onSelectedNav,
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
  } = useMenu({ menu: originMenu, onSelect, defaultActiveMenu });

  const layoutProviderValue = useMemo(
    () => ({
      activeNav,
      activeMenu,
      addTab,
      setOpenKey,
    }),
    [activeNav, activeMenu, addTab, setOpenKey],
  );

  return (
    <ConfigProvider>
      <LayoutContext.Provider value={layoutProviderValue}>
        <Layout className={className}>
          <Sider
            collapsed={collapsed}
            collapsible={collapsible}
            width={siderWidth}
            collapsedWidth={collapsedWidth}
            trigger={
              <TriggerElement
                collapsed={collapsed}
                trigger={trigger}
                onClick={() => setCollapsed(!collapsed)}
              />
            }
          >
            <Flex className="logoBox" align="center" justify="center">
              {logo?.(collapsed)}
            </Flex>
            <div className="menuBox">
              <ConfigProvider theme={sideMenuStyle}>
                <Menu
                  theme="light"
                  mode="inline"
                  className={`${prefixCls}-second-menu`}
                  items={menu}
                  selectedKeys={selectedMenu}
                  onSelect={onSelectedMenu}
                  openKeys={openKeys}
                  onOpenChange={onMenuOpenChange}
                  style={{ marginTop: 8, borderInlineEnd: 0 }}
                  inlineIndent={6}
                />
              </ConfigProvider>
            </div>
          </Sider>
          <Layout>
            <Header>
              <Flex justify="space-between" align="center" style={{ padding: '0 16px 0 0' }}>
                <div style={{ flex: '1 1 auto' }}>
                  <ConfigProvider theme={topMenuStyle}>
                    <Menu
                      mode="horizontal"
                      items={navbar}
                      selectedKeys={innerSelectedNav}
                      onSelect={onSelectedNav}
                      style={{ height: 40, paddingBottom: 6 }}
                    />
                  </ConfigProvider>
                </div>
                {extra}
              </Flex>
            </Header>
            <Layout>
              <Header style={{ height: 36, overflow: 'hidden' }}>
                <TabBar
                  tabbar={tabbar}
                  selected={selectedTabbar}
                  onSelect={onSelectTarbar}
                  onRemove={removeTab}
                />
              </Header>
              <Content
                style={{
                  position: 'relative',
                  background: '#d6e5ff',
                  padding: '8px',
                  overflow: 'auto',
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </LayoutContext.Provider>
    </ConfigProvider>
  );
});

export default React.memo(LayoutZeus);
