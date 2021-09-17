import { IBaseMenuInfo } from '@/layout/AppLayout';
import { makeAutoObservable, runInAction } from 'mobx';

interface IUserInfo {
  userName: string;
}

interface IMenuInfo extends IBaseMenuInfo {
}

export class UserStore {
  userInfo: IUserInfo | undefined = undefined;
  menu: IMenuInfo[] = [] as IMenuInfo[];

  constructor() {
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

    runInAction(() => {
      this.menu = res.result;
    });
  }
}

export default new UserStore();
