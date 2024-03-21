import { CloseOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { ConfigProvider, Flex, Layout, Menu } from 'antd';
import type { ItemType, MenuItemGroupType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePrefixCls } from '../utils';
import left from './img/left.png';
import right from './img/right.png';
import type { IBaseMenuInfo, LayoutExtProps } from './LayoutHermesExt';
import { TriggerElement } from './LayoutHermesExt';

const { Header, Content, Sider } = Layout;
const pd = 0;
const scrollStep = 200;
const logo = (siderWidth?: number) => css`
  width: ${siderWidth}px;
  height: 100%;
`;
const tabContainerStyle = css`
  position: relative;
  height: 36px;
  background-color: #eef4ff;
`;

const tabContentStyle = css`
  height: 100%;
  overflow-x: auto;
  padding: 0 ${pd}px;
  ::-webkit-scrollbar {
    width: 0px; // 纵向滚动条
    height: 0px; // 横向滚动条
    background-color: transparent;
  }
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

const imgStyle = css`
  display: block;
  cursor: pointer;
  position: absolute;
  top: 0;
  z-index: 999;
`;

function TabItem(props: {
  tab: { code: string | number; label: string };
  tabActive: string | number;
  showRemoveIcon: boolean;
  onSelect: (key: string | number) => void;
  onRemove: (key: string | number) => void;
}) {
  const { tab, showRemoveIcon, onSelect, onRemove, tabActive } = props;

  const classes = classNames(tabItemStyle, tab.code === tabActive ? tabItemActiveStyle : undefined);

  const _onRemove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, code: string | number) => {
      e.stopPropagation();
      onRemove(code);
    },
    [onRemove],
  );

  return (
    <div className={classes} onClick={() => onSelect(tab.code)} id={tab.code + ''}>
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
    tabActive,
  } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [firstLevelMenuKey, setFirstLevelMenuKey] = useState<string | undefined>(undefined);
  const [secondMenu, setSecondMenu] = useState<ItemType[]>([]);
  const [scrollData, setScrollData] = useState<{
    scrollLeft: number;
    clientWidth: number;
    scrollWidth: number;
  }>({ scrollLeft: 0, clientWidth: 0, scrollWidth: 0 });
  const tabContentRef = useRef<HTMLDivElement>(null);
  const { current: tabContentEl } = tabContentRef;
  const { token, prefixCls, mtPrefixCls } = usePrefixCls();

  const finSiderWidth = collapsed ? 62 : siderWidth || 134;

  const firstLevelMenu = useMemo(() => {
    return (menu || []).map(item => {
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
      const menus = (menu || []).find(item => item.url === key)?.children || [];
      setSecondMenu(
        menus && menus.length > 0
          ? menus.map(item => bindMenu({ isGroup: needMenuGroup, menu: item }))
          : undefined,
      );
      setFirstLevelMenuKey(key);
    },
    [bindMenu, menu, needMenuGroup],
  );
  const reach = useMemo(
    () => ({
      L: scrollData?.scrollLeft <= pd,
      R: scrollData?.scrollWidth - scrollData?.scrollLeft - scrollData?.clientWidth <= pd,
    }),
    [scrollData],
  );

  const scrollTo = useCallback(
    (direction: 'L' | 'R') => {
      const lft = tabContentEl.scrollLeft + (direction === 'L' ? -scrollStep : scrollStep);
      tabContentEl?.scrollTo({ left: lft, behavior: 'smooth' });
    },
    [tabContentEl],
  );

  const RfScrollLeft = useCallback(() => {
    setScrollData({
      scrollLeft: tabContentEl?.scrollLeft || 0,
      clientWidth: tabContentEl?.clientWidth || 0,
      scrollWidth: tabContentEl?.scrollWidth || 0,
    });
  }, [tabContentEl]);

  const listenDom = () => {
    const resizeObserver = new ResizeObserver(RfScrollLeft);
    resizeObserver.observe(tabContentEl);
    tabContentEl?.addEventListener('scroll', RfScrollLeft);
  };

  useEffect(() => {
    const { pathname } = props.history.location || {};
    const arr = (pathname || '').split('/');
    onFirstLevelMenuSelect({ key: arr.length > 1 ? `/${arr[1]}` : '/' });
  }, []);

  useEffect(() => {
    tabContentEl && listenDom();
  }, [tabContentEl]);
  useEffect(RfScrollLeft, [tabs?.length]);
  useEffect(() => {
    try {
      setTimeout(() => {
        document.getElementById(tabActive + '')?.scrollIntoView({
          block: 'nearest',
        });
      });
    } catch (error) {}
  }, [tabActive]);

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
            <div className={tabContainerStyle}>
              {!reach.L && (
                <img
                  src={left}
                  className={imgStyle}
                  style={{ left: 0 }}
                  onClick={scrollTo.bind(null, 'L')}
                />
              )}
              <Flex align="center" className={tabContentStyle} ref={tabContentRef}>
                {tabs.map(item => (
                  <TabItem
                    tab={item}
                    showRemoveIcon
                    onSelect={onTabClick}
                    onRemove={onTabRemove}
                    key={item.code}
                    tabActive={tabActive}
                  />
                ))}
              </Flex>
              {!reach.R && (
                <img
                  src={right}
                  className={imgStyle}
                  style={{ right: 0 }}
                  onClick={scrollTo.bind(null, 'R')}
                />
              )}
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
