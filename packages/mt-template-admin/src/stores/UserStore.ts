import { action, makeAutoObservable, runInAction } from 'malganis/mobx';
import React from 'react';
import { DollarOutlined } from '@ant-design/icons';
import { simple2Tree, getFullPath, getSelectedMenu } from '@m-tools/browser-utils';

import type { IBaseMenuInfo } from '@/layout/AppLayout';

const mapIcon: { [key: string]: React.FunctionComponent } = {
  DollarOutlined,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMenuInfo extends IBaseMenuInfo {
  code: string;
  id: number;
  nameZn: string;
  pId: number;
  path: string;
  icon?: string | React.ReactNode;
}

export class UserStore {
  namespace = 'UserStore';

  userInfo: Partial<{ nickname: string }> | undefined; // 用户信息

  menu: IMenuInfo[] = []; // 菜单树状结构

  mapBreadcrumb: { [path: string]: string } = {}; // 匹配面包屑导航

  layoutOpenKeys: string[] = []; // 默认展开的菜单

  layoutSelectedKeys: string[] = []; // 默认选择的菜单项

  constructor() {
    makeAutoObservable(this, {
      namespace: false,
      getBaseInfo: action.bound,
      setOpenKeys: action.bound,
      setSelectedKeys: action.bound,
    });
  }

  async login(): Promise<void> {
    // fetch
    const res = await Promise.resolve({ result: { nickname: '未知用户' } });

    runInAction(() => {
      this.userInfo = res.result || { nickname: '未知用户' };
    });
  }

  async logout(): Promise<void> {
    window.localStorage.clear();
    // fetch
    await Promise.resolve({});
  }

  async getBaseInfo(): Promise<void> {
    try {
      const [userInfo, menu] = await Promise.all([
        Promise.resolve({ result: { nickname: '未知用户' } }),
        Promise.resolve<{ result: IMenuInfo[] }>({
          result: [
            {
              code: 'demo',
              id: 1,
              nameZn: 'Demo',
              pId: 0,
              path: '/Demo',
              icon: 'DollarOutlined',
            },
            {
              code: 'demoBaseCom',
              id: 2,
              nameZn: 'DemoBaseCom',
              pId: 1,
              path: '/Demo/DemoBaseCom',
            },
            {
              code: 'demoMulStore',
              id: 3,
              nameZn: 'DemoMulStore',
              pId: 1,
              path: '/Demo/DemoMulStore',
            },
            {
              code: 'demoNoStore',
              id: 4,
              nameZn: 'DemoNoStore',
              pId: 1,
              path: '/Demo/DemoNoStore',
            },
            {
              code: 'errorpage',
              id: 5,
              nameZn: 'ErrorPage',
              pId: 0,
              path: '/ErrorPage',
              icon: 'DollarOutlined',
            },
            {
              code: 'errorpage404',
              id: 6,
              nameZn: '404',
              pId: 5,
              path: '/404',
            },
            {
              code: 'errorpage403',
              id: 7,
              nameZn: '403',
              pId: 5,
              path: '/403',
            },
            {
              code: 'errorpage500',
              id: 8,
              nameZn: '500',
              pId: 5,
              path: '/500',
            },
          ],
        }),
      ]);

      runInAction(() => {
        this.userInfo = userInfo.result || { nickname: '未知用户' };
        const menus = menu.result || [];

        const mapBreadcrumb: { [path: string]: string } = {};
        const menuKeys: string[] = [];
        menus.forEach(item => {
          mapBreadcrumb[item.path] = item.nameZn;
          menuKeys.push(item.path);
        });

        this.mapBreadcrumb = {
          '/Demo/DemoBaseCom/ThirdPage': '第三级菜单',
          ...mapBreadcrumb,
        };

        this.layoutOpenKeys = getFullPath(window.location.pathname);

        this.layoutSelectedKeys = [getSelectedMenu(window.location.pathname, menuKeys)];

        this.menu = simple2Tree<IMenuInfo>({
          simpleData: menus.map(menuItem => ({
            ...menuItem,
            url: menuItem.path,
            name: menuItem.nameZn,
            icon: menuItem.icon ? React.createElement(mapIcon[menuItem.icon as string]) : undefined,
          })),
        });
      });
    } catch (ex) {
      console.warn(ex);
    }
  }

  setOpenKeys(openKeys: string[]): void {
    this.layoutOpenKeys = openKeys;
  }

  setSelectedKeys(selectedKeys: string[]): void {
    this.layoutSelectedKeys = selectedKeys;
  }
}

export default new UserStore();
