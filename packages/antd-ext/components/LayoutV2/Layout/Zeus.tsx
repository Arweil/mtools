import type { SiderProps } from 'antd';
import { ConfigProvider, Flex, Layout, Menu } from 'antd';
import React, { useMemo, useState } from 'react';
import { usePrefixCls } from '../../utils';
import NavBar from '../components/NavBar';
import TabBar from '../components/TabBar';
import TriggerElement from '../components/TriggerElement';
import { LayoutContext } from '../context';
import useMenu from '../hooks/useMenu';
import type { LayoutProps } from '../types';

const { Sider, Header, Content } = Layout;

const theme = {
  components: {
    Menu: {
      subMenuItemBg: 'transparent',
      itemSelectedBg: 'transparent',
      itemSelectedColor: '#016EFF',
      itemHoverBg: '#DFEBFF',
      itemColor: '#666666',
      fontSize: 12,
      iconSize: 16,
      itemMarginBlock: 0,
      iconMarginInlineEnd: 4,
    },
  },
};

const LayoutZeus: React.FC<LayoutProps> = React.forwardRef((props, ref) => {
  const {
    className,
    collapsible,
    collapsedWidth = 62,
    extra,
    hideTabbar,
    logo,
    onCollapse,
    siderWidth = 134,
    trigger,
    children,
    // 以下旧版本属性兼容
    headerExtra,
    setTitle,
  } = props;
  const { prefixCls } = usePrefixCls();
  const [collapsed, setCollapsed] = useState(false);
  const {
    navbar,
    selectedNav,
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
    onCollapse(_collapsed, { type, siderWidth, collapsedWidth });
  };

  return (
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
          onCollapse={onInnerCollapse}
        >
          <Flex className={`${prefixCls}-logoBox`} align="center" justify="center">
            {logo?.(collapsed) || setTitle?.({ collapsed })}
          </Flex>
          <div className={`${prefixCls}-menuBox`}>
            <ConfigProvider theme={theme}>
              <Menu
                theme="light"
                mode="inline"
                className={`${prefixCls}-second-menu`}
                items={menu}
                selectedKeys={selectedMenu}
                onClick={onSelectedMenu}
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
              <NavBar items={navbar} selectedKeys={selectedNav} onSelect={onSelectedNav} />
              <div style={{ flex: '0 0 auto' }}>{extra || headerExtra}</div>
            </Flex>
          </Header>
          <Layout>
            <Header
              style={{ height: 36, overflow: 'hidden', display: hideTabbar ? 'none' : 'block' }}
            >
              <TabBar
                tabbar={tabbar}
                selected={selectedTabbar}
                onSelect={onSelectTarbar}
                onRemove={removeTab}
              />
            </Header>
            <Content style={{ position: 'relative', background: '#d6e5ff', overflow: 'auto' }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </LayoutContext.Provider>
  );
});

export default React.memo(LayoutZeus);
