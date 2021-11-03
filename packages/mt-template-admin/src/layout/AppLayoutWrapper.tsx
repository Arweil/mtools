import React, { useEffect } from 'react';
import { inject, observer } from 'malganis/mobx-react';
import { toJS } from 'malganis/mobx';
import { UserStore as UserStoreMbx } from '@/stores/UserStore';
import AppLayout from './AppLayout';

interface IAppLayoutWrapperProps {
  store?: {
    UserStore: UserStoreMbx;
  };
  children?: React.ReactNode;
}

function AppLayoutWrapper(props: IAppLayoutWrapperProps) {
  const { children, store } = props;
  const { UserStore } = store!;
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

      return () => { };
    })().catch(() => {});
  }, []);

  return (
    <AppLayout
      menu={menu || []}
      userName={userInfo && userInfo.userName || ''}
      setTitle={({ collapsed }) => (
        (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
            <div style={{ color: '#fff', fontSize: 20, textAlign: 'center', flex: 1, }}>
              {
                collapsed ? 'Demo' : 'Demo Application'
              }
            </div>
          </div>
        )
      )}
    >
      {children}
    </AppLayout>
  );
}

AppLayoutWrapper.defaultProps = {
  store: {
    UserStore: {},
  },
  children: null,
};

export default inject('store')(observer(AppLayoutWrapper));
