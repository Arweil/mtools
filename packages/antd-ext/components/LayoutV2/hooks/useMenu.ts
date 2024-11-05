import type { ItemType, MenuDividerType, MenuItemType } from 'antd/es/menu/interface';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { IBaseMenuInfo, LayoutProps, MenuType, SelectInfo, Tabbar } from '../types';
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
function useMenu(data: LayoutProps & { firstLevelTabbar?: boolean }, collapsed: boolean) {
  const {
    menu: originMenu,
    defaultActiveMenu,
    openKeys: originOpenKeys,
    onSelect,
    onTabClick,
    onTabRemove,
    selectedKeys,
    setOpenKeys: setOriginOpenKeys,
    setSelectedKeys,
    tabActive,
    tabs,
    history,
    needMenuGroup = true, // 一级菜单是否使用分组
    firstLevelTabbar = false, // 是否使用一级菜单作为tabbar
  } = data;

  // 预加工菜单，主要为了兼容老版本layout数据类型
  const preprocessMenu = useMemo(() => {
    function recursive(menu?: MenuType | IBaseMenuInfo[]) {
      if (!menu || menu?.length === 0) return undefined;
      return menu.map(item => {
        const newItem = { ...item };
        if ('url' in item) {
          newItem.key = item.url;
        }
        if ('name' in item) {
          newItem.label = item.name;
        }
        if ('children' in item) {
          newItem.children = recursive(item.children);
        }
        return newItem;
      });
    }

    return recursive(originMenu);
  }, [originMenu]);

  // 顶部导航栏
  const [navbar, setNavbar] = useState<MenuItemType[]>();
  const [selectedNav, setSelectedNav] = useMergeState<string[]>([]);
  // 菜单信息
  const [menu, setMenu] = useState<ItemType[]>();
  const [openKeys, setOpenKeys] = useMergeState<string[]>([], { value: originOpenKeys });
  const [selectedMenu, setSelectedMenu] = useMergeState<string[]>([], { value: selectedKeys });
  // tabbar(访问记录)
  const originTabbar = useMemo<Tabbar[]>(
    () => tabs?.map(item => ({ key: `${item.code}`, label: item.label })),
    [tabs],
  );
  const [tabbar, setTabbar] = useMergeState<Tabbar[]>([], { value: originTabbar });
  const [selectedTabbar, setSelectedTabbar] = useMergeState<string>(undefined, {
    value: tabActive ? `${tabActive}` : undefined,
  });
  // 选择逻辑是否在执行中，通常用于防止重复触发
  const selectLogicRunning = useRef(false);

  // 侧边菜单/tabbar选择回调
  const onSelectMemo = useLatest(onSelect);
  // tabbar点击回调
  const onTabClickMeno = useLatest(onTabClick);
  // tabbar移除回调
  const onTabRemoveMeno = useLatest(onTabRemove);
  // openKeys设置
  const setOriginOpenKeysMemo = useLatest(setOriginOpenKeys);

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

  // 通过层级关系查找给定key的路径
  const findMenuKeyPathMemo = useLatest((key: string, subMenu?: MenuType): string[] => {
    const info = findClosestMenu(key, subMenu);
    const currentKey = info?.key ? `${info.key}` : undefined;

    if (!currentKey) return [];

    // 存在子菜单，继续查找。
    // 需满足条件：1.存在子菜单 2.当前key不是子菜单的key
    if (info && 'children' in info && info.children?.length && currentKey !== key) {
      return [currentKey, ...findMenuKeyPathMemo(key, info.children)];
    }
    return [currentKey];
  });

  // 从菜单树中查找给定key的路径
  const findKeyPathByMenu = useLatest((key: string): string[] => {
    const path = [];

    const findPath = (subMenu?: MenuType) => {
      for (let i = 0; i < subMenu?.length; i++) {
        const item = subMenu[i];
        if (item.key === key) {
          path.unshift(item.key as string);
          return item;
        }
        if ('children' in item) {
          const info = findPath(item.children as MenuType);
          if (info) {
            path.unshift(item.key as string);
            return info;
          }
        }
      }
    };

    findPath(preprocessMenu);

    return path;
  });

  // 查找给定key的菜单信息，优先从菜单树中查找，找不到则找相近菜单
  const findKeyPath = useLatest((key: string, subMenu?: MenuType) => {
    const pathByMenu = findKeyPathByMenu(key);
    const pathByClosest = findMenuKeyPathMemo(key, subMenu);
    return pathByMenu.length ? pathByMenu : pathByClosest;
  });

  // 导航栏变化回调
  const onNavChangeMemo = useLatest((selected: string) => {
    if (!selected) return;
    // 如果找不到默认打开第一个
    const navKey = (findKeyPath(selected, preprocessMenu)?.[0] ?? preprocessMenu[0]?.key) as string;
    const newMenu = firstLevelTabbar
      ? getMenu(preprocessMenu, navKey)
      : preprocessMenu.map(itm => ({ ...itm, type: needMenuGroup ? 'group' : 'item' }));
    // 选中项和当前选中项一致则不处理
    if (navKey !== selectedNav[0]) {
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
      const item = findMenuInfo(selected, preprocessMenu) as Exclude<ItemType, MenuDividerType>;
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

  // 侧边菜单展开
  const onMenuOpenChangeMemo = useLatest((key: string, subMenu?: MenuType) => {
    const path = findKeyPath(key, subMenu);
    // 侧边菜单收齐时不触发open，否则悬浮菜单会突然抖动
    if (path.length && !collapsed) {
      setOpenKeys(pre => Array.from(new Set([...pre, ...path])));
    }
  });

  // 侧边菜单选中
  const onSelectedMenu = useLatest((info: SelectInfo | { key: string }, subMenu?: MenuType) => {
    selectLogicRunning.current = true;
    const { key } = info;
    // 1、选中菜单，需要查找最接近的菜单
    const selected = findKeyPath(key, subMenu || menu).slice(-1);
    setSelectedMenu(selected);
    // 2、更新tabbar信息，如果tabbar中存在tab信息优先取用
    const tabInfo = tabbar.find(item => item.key === key);
    onTabbarChangeMemo(tabInfo ? tabInfo : key);
    // 3、触发业务应用回调
    onSelectMemo?.({ key });
    // 旧版本layout的onSelect回调兼容
    setSelectedKeys?.([key]);
    // 旧版本layout的跳转逻辑兼容
    if (history) {
      history.push(key);
    }
    selectLogicRunning.current = false;
  });

  const isNotUpdateTabbar = useLatest((key: string) => {
    return key === selectedTabbar;
  });

  // tabbar选中(比侧边菜单选中多一个行为：顶部菜单可能需要切换)
  const onSelectTarbar = useLatest((key: string) => {
    if (!isNotUpdateTabbar(key)) {
      onTabClickMeno?.(key);
      // 触发一级菜单回调
      const sMenu = onNavChangeMemo(key);
      // 触发二级菜单回调
      onSelectedMenu({ key }, sMenu);
      onMenuOpenChangeMemo(key, sMenu);
    }
  });

  // 侧边菜单展开
  const onMenuOpenChange = useCallback(
    (keys: string[]) => {
      setOpenKeys(keys);
      setOriginOpenKeysMemo?.(keys);
    },
    [setOpenKeys, setOriginOpenKeysMemo],
  );

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
      setSelectedMenu(findKeyPath(key, sMenu));
      onMenuOpenChangeMemo(key, sMenu);
    },
    [onNavChangeMemo, setSelectedMenu, findKeyPath, onMenuOpenChangeMemo],
  );

  // 侧边菜单展开
  const setOpenKey = useLatest((key: string | ((keys: string[]) => string[])) => {
    if (!collapsed) {
      setOpenKeys(pre => {
        if (typeof key === 'function') {
          return Array.from(new Set(key(pre)));
        }
        return Array.from(new Set([...pre, key]));
      });
    }
  });

  // 添加tabbar
  const addTab = useCallback(
    (info: string | { key: string; label: string }) => {
      onTabbarChangeMemo(info);
    },
    [onTabbarChangeMemo],
  );

  // 移除tabbar
  const removeTab = useLatest((key: string) => {
    onTabRemoveMeno?.(key);
    setTabbar(prev => {
      // 关闭的是选中的tab需要切换到下一个tab
      if (selectedTabbar === key) {
        const index = prev.findIndex(({ key: k }) => k === key);
        const newSelectedTabbar = prev[index - 1]?.key ?? prev[index + 1]?.key;
        setSelectedTabbar(newSelectedTabbar);
        // 如果切换了新的tab需要通知应用
        onSelectMemo?.({ key: newSelectedTabbar });
      }
      return prev.filter(({ key: k }) => k !== key);
    });
  });
  // ==================================== end 对应用暴露的api===========================================

  // 初始化
  useEffect(() => {
    if (preprocessMenu?.length > 0) {
      // 导航栏
      const newNavbar = getNavbar(preprocessMenu);
      setNavbar(newNavbar);
      // 菜单、tab激活
      const { pathname, search } = location;
      const activeKey = defaultActiveMenu ?? `${pathname}${search}`;
      activeMenu(activeKey);
      addTab(activeKey);
    }
  }, [activeMenu, addTab, preprocessMenu, defaultActiveMenu]);

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
  };
}

export default useMenu;
