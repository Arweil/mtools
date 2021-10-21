import React, { useEffect } from 'react';
import { UserStore } from '@/stores/UserStore';
import AppLayout from './AppLayout';
import { inject, observer } from 'malganis/mobx-react';
import { toJS } from 'malganis/mobx';

interface IAppLayoutWrapperProps {
  store?: {
    UserStore: UserStore;
  };
  children?: React.ReactNode;
}

function AppLayoutWrapper(props: IAppLayoutWrapperProps) {
  const { UserStore } = props.store!;
  const userInfo = UserStore && toJS(UserStore.userInfo);
  const menu = UserStore && toJS(UserStore.menu);

  useEffect(() => {
    (async () => {
      try {
        if (UserStore) {
          await Promise.all([
            UserStore.setMenu(),
            UserStore.getUserInfo(),
          ]);
        }
      } catch (ex) {
        console.warn(ex);
      }

      return () => { }
    })();
  }, []);

  return (
    <AppLayout
      menu={menu || []}
      userName={userInfo && userInfo.userName || ''}
      setTitle={({ collapsed }) => {
        return (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
            <div style={{ color: '#fff', fontSize: 20, textAlign: 'center', flex: 1, }}>
              {
                collapsed ? 'Demo' : 'Demo Application'
              }
            </div>
          </div>
        );
      }}
    >
      {props.children}
    </AppLayout>
  );
}

export default inject('store')(observer(AppLayoutWrapper));
