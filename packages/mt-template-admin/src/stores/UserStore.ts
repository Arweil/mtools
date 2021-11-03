import { makeAutoObservable, runInAction } from 'malganis/mobx';
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { IBaseMenuInfo } from '@/layout/AppLayout';

const mapIcon: { [key: string]: React.FunctionComponent } = {
  SmileOutlined,
};

export interface IUserInfo {
  userName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMenuInfo extends IBaseMenuInfo {
}

export class UserStore {
  userInfo: IUserInfo | undefined;

  menu: IMenuInfo[];

  constructor() {
    this.userInfo = undefined;
    this.menu = [];

    makeAutoObservable(this);
  }

  async login(): Promise<void> {
    // call @/api restful api
    const res = await Promise.resolve({ code: '0', result: { userName: 'demo user' } });
    runInAction(() => {
      this.userInfo = res.result;
    });
  }

  async logout(): Promise<{ code: string; }> {
    await Promise.resolve({ code: '0' });
  }

  async getUserInfo(): Promise<void> {
    const res = await Promise.resolve({ code: '0', result: { userName: 'demo user' } });
    runInAction(() => {
      this.userInfo = res.result;
    });
  }

  modifyPwd() {}

  async setMenu(): Promise<void> {
    function test(tree: IBaseMenuInfo[]) {
      if (tree && tree.length > 0) {
        tree.forEach((treeItem) => {
          const { icon, children } = treeItem;
          treeItem.icon = icon && React.createElement(mapIcon[icon as string]);
          if (children && children.length > 0) {
            test(children);
          }
        });
      }
    }

    // call @/api restful api
    const res = await Promise.resolve({
      code: '0',
      result: [{
        icon: 'SmileOutlined',
        children: [
          {
            url: '/demo/demo',
            name: 'demo',
          },
          {
            url: '/demo/demoA',
            name: 'demoA',
          },
          {
            url: '/403',
            name: '403',
          },
          {
            url: '/404',
            name: '404',
          },
          {
            url: '/500',
            name: '500',
          },
        ],
        url: '/demo',
        name: 'demo',
      }],
    });

    const menu = res.result;
    test(menu);

    runInAction(() => {
      this.menu = menu;
    });
  }
}

export default new UserStore();
