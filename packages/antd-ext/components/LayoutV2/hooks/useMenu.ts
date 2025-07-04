import type { ItemType, MenuDividerType, MenuItemType, SubMenuType } from 'antd/es/menu/interface';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useDebounceFn from '../../utils/useDebounceFn';
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
function findMenuInfo(key: string, menu?: MenuType): MenuType[number] {
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

function isMenu(menu: ItemType): menu is MenuItemType | SubMenuType {
  return 'key' in menu && 'label' in menu;
}

/**
 * 菜单操作hook
 * @param menu
 * @returns
 */
function useMenu(data: LayoutProps, collapsed: boolean) {
  const {
    autoSelectFirstMenuOnNavbar,
    menu: originMenu,
    openKeys: originOpenKeys,
    onSelect = () => undefined,
    onTabClick,
    onTabRemove,
    selectedKeys,
    setOpenKeys: setOriginOpenKeys,
    setSelectedKeys: setOriginSelectedKeys,
    tabActive,
    tabs,
    history,
    needMenuGroup = true, // 一级菜单是否使用分组
    hasNavbar, // 是否有导航栏
  } = data;

  // 预加工菜单，主要为了兼容老版本layout数据类型
  const preprocessMenu = useMemo((): MenuType => {
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
  const historyRef = useRef(history);

  // 侧边菜单/tabbar选择回调
  const onSelectMemo = useDebounceFn(onSelect, 500);
  // tabbar点击回调
  const onTabClickMeno = useLatest(onTabClick);
  // tabbar移除回调
  const onTabRemoveMeno = useLatest(onTabRemove);
  // openKeys设置回调
  const setOriginOpenKeysMemo = useLatest(setOriginOpenKeys);
  // selectedKeys设置回调
  const setOriginSelectedKeysMemo = useLatest(setOriginSelectedKeys);

  // 找到最相近的上下级关系菜单
  const findClosestMenu = useLatest((path: string, subMenu?: MenuType): MenuType[number] => {
    const curPathSegments = path?.split('/').slice(1);
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
    return pathByMenu.length ? pathByMenu : findMenuKeyPathMemo(key, subMenu);
  });

  // 导航栏变化回调
  const onNavChangeMemo = useLatest((selected: string) => {
    if (!selected) return;
    // 如果找不到默认打开第一个
    const navKey = (findKeyPath(selected, preprocessMenu)?.[0] ?? preprocessMenu[0]?.key) as string;
    // 是否需要一级导航
    let newMenu = hasNavbar ? getMenu(preprocessMenu, navKey) : preprocessMenu;
    // 左侧菜单分组
    newMenu = newMenu?.map(itm => ({
      ...itm,
      type: needMenuGroup ? 'group' : 'item',
    })) as MenuType;
    // 选中项和当前选中项一致则不处理
    if (navKey !== selectedNav[0]) {
      setSelectedNav([navKey]);
      // 更新二级菜单信息
      setMenu(newMenu);
    }
    return newMenu;
  });

  // 查找第一个叶子菜单
  const findLeafMenu = useLatest((subMenu: MenuType) => {
    if (!subMenu?.length) return undefined;
    const first = subMenu[0];
    if ('children' in first) {
      return findLeafMenu(first.children as MenuType);
    }
    return first;
  });

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

    // 查找当前菜单项信息
    const menuItem = findMenuInfo(key, preprocessMenu);
    const navigationMode = menuItem?.navigationMode;

    // 3、触发业务应用回调
    onSelectMemo?.({ key });

    if (navigationMode === 'open') {
      window.open(key);
    } else {
      // 2、更新tabbar信息，如果tabbar中存在tab信息优先取用
      const tabInfo = tabbar.find(item => item.key === key);
      onTabbarChangeMemo(tabInfo ? tabInfo : key);
      // 旧版本layout的onSelect回调兼容
      setOriginSelectedKeysMemo?.([key]);
      // 旧版本layout的跳转逻辑兼容
      if (historyRef.current && navigationMode !== 'none') {
        historyRef.current.push(key);
      }
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

  // 侧边菜单展开回调
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
      setTimeout(() => {
        // 更新侧边菜单
        const keys = findKeyPath(key, sMenu);
        setSelectedMenu(keys);
        // 打开侧边菜单
        onMenuOpenChange(keys);
        // 触发应用回调
        setOriginSelectedKeysMemo?.(keys.slice(-1));
      }, 0);
    },
    [onNavChangeMemo, setSelectedMenu, findKeyPath, onMenuOpenChange, setOriginSelectedKeysMemo],
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
  const removeTab = useLatest((key?: string) => {
    if (key) {
      setTabbar(prev => {
        // 关闭的是选中的tab需要切换到下一个tab
        if (selectedTabbar === key) {
          const index = prev.findIndex(({ key: k }) => k === key);
          const newSelectedTabbar = prev[index - 1]?.key ?? prev[index + 1]?.key;
          setSelectedTabbar(newSelectedTabbar);
          activeMenu(newSelectedTabbar);
          // 如果切换了新的tab需要通知应用
          onSelectMemo?.({ key: newSelectedTabbar });
        }
        return prev.filter(({ key: k }) => k !== key);
      });
      onTabRemoveMeno?.(key);
    } else {
      // 不传默认移除全部
      setTabbar([]);
      setSelectedTabbar('');
    }
  });
  // ==================================== end 对应用暴露的api===========================================

  // 导航栏选中
  const onSelectedNav = useCallback(
    (info: SelectInfo) => {
      const { key } = info;
      const newMenu = onNavChangeMemo(key);
      if (autoSelectFirstMenuOnNavbar) {
        // 默认打开第一个
        const first = findLeafMenu(newMenu);
        if (first) {
          activeMenu(first.key);
          addTab(first.key);
          onSelectMemo?.({ key: first.key });
        }
      }
    },
    [onNavChangeMemo, findLeafMenu, activeMenu, addTab, onSelectMemo, autoSelectFirstMenuOnNavbar],
  );

  // 初始化
  useEffect(() => {
    if (preprocessMenu?.length > 0) {
      // 导航栏
      const newNavbar = getNavbar(preprocessMenu);
      setNavbar(newNavbar);
      // 菜单、tab激活
      const { pathname, search } = location;
      const activeKey = `${pathname}${search}`;
      activeMenu(activeKey);
      addTab(activeKey);
    }
  }, [activeMenu, addTab, preprocessMenu]);

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

    const innerHistory = historyRef.current;
    let unlisten = null;

    // 优先使用react-router的history监听
    if (innerHistory) {
      unlisten = innerHistory.listen(callback);
    } else {
      window.addEventListener('popstate', callback);
    }

    return () => {
      if (innerHistory) {
        unlisten();
      } else {
        window.removeEventListener('popstate', callback);
      }
    };
  }, [historyRef, activeMenu, addTab]);

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
