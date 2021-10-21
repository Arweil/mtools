import { IBaseMenuInfo } from '@/layout/AppLayout';
import { autorun, makeAutoObservable, runInAction } from 'malganis/mobx';
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';

const mapIcon: { [key: string]: React.FunctionComponent } = {
  SmileOutlined: SmileOutlined,
}

export interface IUserInfo {
  userName: string;
}

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

  async login() {
    const res = await Promise.resolve({ code: '0', result: { userName: 'demo user' } });
    runInAction(() => {
      this.userInfo = res.result;
    })
  }

  async logout() {
    await Promise.resolve({ code: '0' });
  }

  async getUserInfo() {
    const res = await Promise.resolve({ code: '0', result: { userName: 'demo user' } });
    runInAction(() => {
      this.userInfo = res.result;
    })
  }

  modifyPwd() {}

  async setMenu() {
    function test(tree: IBaseMenuInfo[]) {
      if (tree && tree.length > 0) {
        tree.forEach(treeItem => {
          treeItem.icon = treeItem.icon && React.createElement(mapIcon[treeItem.icon as string]);
          if (treeItem && treeItem.children && treeItem.children.length > 0) {
            test(treeItem.children);
          }
        })
      }
    }

    const res = await Promise.resolve({
      code: '0',
      result: [{
        icon: 'SmileOutlined',
        children: [
          {
            url: '/demo',
            name: 'demo'
          },
          {
            url: '/403',
            name: '403'
          },
          {
            url: '/404',
            name: '404'
          },
          {
            url: '/500',
            name: '500'
          },
        ],
        url: '/',
        name: 'demo',
      }]
    });

    const menu = res.result;
    test(menu);

    runInAction(() => {
      this.menu = menu;
    });
  }
}

export default new UserStore();
