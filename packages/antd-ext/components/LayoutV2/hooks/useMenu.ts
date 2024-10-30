import type { ItemType, MenuDividerType, MenuItemType } from 'antd/es/menu/interface';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { LayoutProps, MenuType, SelectInfo, Tabbar } from '../types';
import useLatest from './useLatest';
import useMergeState from './useMergeState';

/**
 * 导航栏获取
 * @param menu
 * @returns
 */
function getNavbar(menu: MenuType): MenuItemType[] {
  return menu?.reduce((prev, item) => {
    if ('key' in item && 'label' in item) return [...prev, { key: item.key, label: item.label }];
    return prev;
  }, [] as MenuItemType[]);
}
/**
 * 侧边菜单获取
 * @param menu
 * @param key
 * @returns
 */
function getMenu(menu: MenuType, key: string): ItemType[] {
  const info = menu.find(({ key: k }) => k === key);
  return info && 'children' in info && info.children.length > 0 ? info.children : undefined;
}
/**
 * 查找菜单信息
 * @param menu
 * @param key
 * @returns
 */
function findMenuInfo(key: string, menu?: MenuType) {
  if (!menu) return undefined;
  for (const item of menu) {
    if (item.key === key) return item;
    if ('children' in item) {
      const info = findMenuInfo(key, item.children || []);
      if (info) return info;
    }
  }
  return undefined;
}

/**
 * 菜单操作hook
 * @param menu
 * @returns
 */
function useMenu(data: {
  menu: MenuType;
  defaultActiveMenu?: LayoutProps['defaultActiveMenu'];
  onSelect?: LayoutProps['onSelect'];
}) {
  const { menu: originMenu, defaultActiveMenu, onSelect } = data;
  // 顶部导航栏
  const [navbar, setNavbar] = useState<MenuItemType[]>();
  const [innerSelectedNav, setSelectedNav] = useMergeState<string[]>([]);
  // 菜单信息
  const [menu, setMenu] = useState<ItemType[]>();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);
  // tabbar(访问记录)
  const [tabbar, setTabbar] = useState<Tabbar[]>([]);
  const [selectedTabbar, setSelectedTabbar] = useState<string>();
  // 选择逻辑是否在执行中，通常用于防止重复触发
  const selectLogicRunning = useRef(false);

  // 侧边菜单/tabbar选择回调
  const onSelectMemo = useLatest(onSelect);

  // 导航栏变化回调
  const onNavChangeMemo = useLatest((selected: string) => {
    if (!selected) return;
    // 如果找不到默认打开第一个
    const navKey = (originMenu?.find(item => selected.startsWith(`${item.key}`))?.key ??
      originMenu[0]?.key) as string;
    const newMenu = getMenu(originMenu, navKey);
    // 选中项和当前选中项一致则不处理
    if (navKey !== innerSelectedNav[0]) {
      setSelectedNav([navKey]);
      // 更新二级菜单信息
      setMenu(newMenu);
    }
    return newMenu;
  });

  // 导航栏选中
  const onSelectedNav = useCallback(
    (info: SelectInfo) => {
      const { key } = info;
      onNavChangeMemo(key);
    },
    [onNavChangeMemo],
  );

  // tabbar变化回调
  const onTabbarChangeMemo = useLatest((info?: string | { key?: string; label: string }) => {
    const { pathname, search } = location;
    // 如果传入的info是string类型，则直接使用，否则使用info.key，info.key为空则使用当前location
    const selected = typeof info === 'string' ? info : info.key ?? `${pathname}${search}`;
    setTabbar(prev => {
      const index = prev.findIndex(item => item.key === selected);
      // 查找label信息
      const item = findMenuInfo(selected, originMenu) as Exclude<ItemType, MenuDividerType>;
      // 优先使用传入的label
      const label = typeof info === 'object' ? info.label : (item?.label as string);
      if (!label) return prev;

      const tab = { key: selected, label };
      // 存在则替换，不存在则新增
      if (index > -1) {
        prev.splice(index, 1, tab);
        return [...prev];
      }
      return [...prev, tab];
    });
    // 选中的tab有变化才更新
    if (selected !== selectedTabbar) setSelectedTabbar(selected);
  });

  // 找到最相近的上下级关系菜单
  const findClosestMenu = useLatest((path: string, subMenu?: MenuType): MenuType[number] => {
    const curPathSegments = path.split('/').slice(1);
    let closestMenu = undefined;
    let maxMatchingSegments = 0;

    subMenu?.forEach(item => {
      const pathSegments = (item.key as string).split('/').slice(1);

      // 找到共有的最大层级
      let matchingSegments = 0;
      while (
        matchingSegments < curPathSegments.length &&
        matchingSegments < pathSegments.length &&
        curPathSegments[matchingSegments] === pathSegments[matchingSegments]
      ) {
        matchingSegments++;
      }

      // 如果当前路径匹配的层级数少于pathSegments的长度，说明不是上下级关系，则跳过
      if (matchingSegments < pathSegments.length) {
        matchingSegments = 0;
      }

      // 如果当前路径匹配的层级数更多，则更新最接近的路径
      if (matchingSegments > maxMatchingSegments) {
        maxMatchingSegments = matchingSegments;
        closestMenu = item;
      }
    });

    return closestMenu;
  });

  // 查找给定key的父级路径
  const findMenuKeyPathMemo = useLatest((key: string, subMenu?: MenuType): string[] => {
    const info = findClosestMenu(key, subMenu);
    const currentKey = `${info?.key}`;

    if (!currentKey) return [];

    // 存在子菜单，继续查找。
    // 需满足条件：1.存在子菜单 2.当前key不是子菜单的key
    if (info && 'children' in info && info.children?.length && currentKey !== key) {
      return [currentKey, ...findMenuKeyPathMemo(key, info.children)];
    }
    return [currentKey];
  });

  // 侧边菜单展开
  const onMenuOpenChangeMemo = useLatest((key: string, subMenu?: MenuType) => {
    const path = findMenuKeyPathMemo(key, subMenu);
    if (path.length) {
      setOpenKeys(pre => Array.from(new Set([...pre, ...path])));
    }
  });

  // 侧边菜单选中
  const onSelectedMenu = useLatest((info: SelectInfo | { key: string }, subMenu?: MenuType) => {
    selectLogicRunning.current = true;
    const { key } = info;
    // 1、选中菜单，需要查找最接近的菜单
    const selected = findMenuKeyPathMemo(key, subMenu || menu).slice(-1);
    setSelectedMenu(selected);
    // 2、更新tabbar信息，如果tabbar中存在tab信息优先取用
    const tabInfo = tabbar.find(item => item.key === key);
    onTabbarChangeMemo(tabInfo ? tabInfo : key);
    // 3、触发业务应用回调
    onSelectMemo({ key });
    selectLogicRunning.current = false;
  });

  const isNotUpdateTabbar = useLatest((key: string) => {
    return key === selectedTabbar;
  });

  // tabbar选中(比侧边菜单选中多一个行为：顶部菜单可能需要切换)
  const onSelectTarbar = useCallback(
    (key: string) => {
      if (!isNotUpdateTabbar(key)) {
        // 触发一级菜单回调
        const sMenu = onNavChangeMemo(key);
        // 触发二级菜单回调
        onSelectedMenu({ key }, sMenu);
        onMenuOpenChangeMemo(key, sMenu);
      }
    },
    [onSelectedMenu, onMenuOpenChangeMemo, onNavChangeMemo, isNotUpdateTabbar],
  );

  // 侧边菜单展开
  const onMenuOpenChange = useCallback((keys: string[]) => {
    setOpenKeys(keys);
  }, []);

  // ==================================== start 对应用暴露的api===========================================
  // 导航栏激活
  const activeNav = useCallback(
    (key: string) => {
      onNavChangeMemo(key);
    },
    [onNavChangeMemo],
  );

  // 菜单激活
  const activeMenu = useCallback(
    (key: string) => {
      // 更新顶部菜单
      const sMenu = onNavChangeMemo(key);
      // 更新侧边菜单
      setSelectedMenu(findMenuKeyPathMemo(key, sMenu));
      onMenuOpenChangeMemo(key, sMenu);
    },
    [onMenuOpenChangeMemo, onNavChangeMemo, findMenuKeyPathMemo],
  );

  // 侧边菜单展开
  const setOpenKey = useCallback((key: string | ((keys: string[]) => string[])) => {
    setOpenKeys(pre => {
      if (typeof key === 'function') {
        return Array.from(new Set(key(pre)));
      }
      return Array.from(new Set([...pre, key]));
    });
  }, []);

  // 添加tabbar
  const addTab = useCallback(
    (info: string | { key: string; label: string }) => {
      onTabbarChangeMemo(info);
    },
    [onTabbarChangeMemo],
  );

  // 移除tabbar
  const removeTab = useLatest((key: string) => {
    setTabbar(prev => {
      // 关闭的是选中的tab需要切换到下一个tab
      if (selectedTabbar === key) {
        const index = prev.findIndex(({ key: k }) => k === key);
        const newSelectedTabbar = prev[index - 1]?.key ?? prev[index + 1]?.key;
        setSelectedTabbar(newSelectedTabbar);
        // 如果切换了新的tab需要通知应用
        onSelectMemo({ key: newSelectedTabbar });
      }
      return prev.filter(({ key: k }) => k !== key);
    });
  });
  // ==================================== end 对应用暴露的api===========================================

  // 初始化
  useEffect(() => {
    if (originMenu?.length > 0) {
      // 导航栏
      const newNavbar = getNavbar(originMenu);
      setNavbar(newNavbar);
      // 菜单、tab激活
      const { pathname, search } = location;
      const activeKey = defaultActiveMenu ?? `${pathname}${search}`;
      activeMenu(activeKey);
      addTab(activeKey);
    }
  }, [activeMenu, addTab, originMenu, defaultActiveMenu]);

  // 监听地址变化激活菜单及tabbar
  useEffect(() => {
    const callback = () => {
      // 选择菜单逻辑在onSelectedMenu中一定会触发地址变更，这里需要过滤掉，防止重复触发
      if (selectLogicRunning.current) return;
      const { pathname, search } = location;
      const key = `${pathname}${search}`;
      addTab(key);
      activeMenu(key);
    };
    window.addEventListener('popstate', callback);

    return () => {
      window.removeEventListener('popstate', callback);
    };
  }, [activeMenu, addTab]);

  return {
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
  };
}

export default useMenu;
