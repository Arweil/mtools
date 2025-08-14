import { Typography } from 'antd';
import type { ItemType, MenuItemType, SubMenuType } from 'antd/es/menu/interface';
import React from 'react';
import CollapsedMenuItem from './components/CollapsedMenuItem';

/**
 * 判断是否为有效菜单项（有key和label属性）
 * @param menu 菜单项
 * @returns 是否为有效菜单项
 */
function isMenu(menu: ItemType): menu is MenuItemType | SubMenuType {
  return 'key' in menu && 'label' in menu;
}

/**
 * Zeus主题的菜单处理函数，处理所有层级菜单标签
 * @param menuItems 菜单项数组
 * @param isCollapsed 是否折叠状态
 * @param isTopLevel 是否为顶层菜单，默认为true
 * @returns 处理后的菜单项数组
 */
export function processZeusMenuLabels(
  menuItems: ItemType[],
  isCollapsed: boolean,
  isTopLevel: boolean = true,
): ItemType[] {
  if (!menuItems) return [];

  return menuItems.map(item => {
    if (!isMenu(item)) return item;

    // 创建一个新对象，避免直接修改原对象
    const newItem = { ...item } as MenuItemType | SubMenuType;
    const { icon, label } = newItem;

    // 根据是否折叠处理label
    if (isCollapsed && isTopLevel) {
      // 在折叠状态下，只处理顶层菜单，使用CollapsedMenuItem组件，并剔除原始icon属性
      newItem.label = React.createElement(CollapsedMenuItem, { icon, label });
      if ('title' in newItem === false) {
        // 只有当title不存在时才添加，避免覆盖原有属性
        (newItem as any).title = label;
      }
      // 剔除原始icon属性
      delete newItem.icon;
    } else if (!isCollapsed) {
      // 非折叠状态下处理所有层级
      newItem.label = React.createElement(
        Typography.Text,
        {
          ellipsis: { tooltip: { placement: 'right' } },
          style: {
            display: 'block',
            width: '100%',
            fontSize: 'inherit',
            color: 'inherit',
            lineHeight: 'inherit',
          },
        },
        label,
      );
    }

    // 递归处理子菜单，折叠状态下子菜单传入isTopLevel=false
    if ('children' in newItem && newItem.children?.length) {
      newItem.children = processZeusMenuLabels(
        newItem.children as ItemType[],
        isCollapsed,
        false, // 子菜单不是顶层菜单
      );
    }

    return newItem;
  });
}

/**
 * Hermes主题的菜单处理函数，只处理非折叠状态下的菜单标签
 * @param menuItems 菜单项数组
 * @param isCollapsed 是否折叠状态
 * @returns 处理后的菜单项数组
 */
export function processHermesMenuLabels(menuItems: ItemType[], isCollapsed: boolean): ItemType[] {
  if (!menuItems) return [];

  return menuItems.map(item => {
    if (!isMenu(item)) return item;

    // 创建一个新对象，避免直接修改原对象
    const newItem = { ...item } as MenuItemType | SubMenuType;
    const { label } = newItem;

    // Hermes主题只处理非折叠状态
    if (!isCollapsed) {
      newItem.label = React.createElement(
        Typography.Text,
        {
          ellipsis: { tooltip: { placement: 'right' } },
          style: {
            display: 'block',
            width: '100%',
            fontSize: 'inherit',
            color: 'inherit',
            lineHeight: 'inherit',
          },
        },
        label,
      );
    }

    // 递归处理子菜单
    if ('children' in newItem && newItem.children?.length) {
      newItem.children = processHermesMenuLabels(newItem.children as ItemType[], isCollapsed);
    }

    return newItem;
  });
}
