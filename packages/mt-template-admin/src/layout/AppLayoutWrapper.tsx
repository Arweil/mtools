import { UserStore as UserStoreMbx } from '@/stores/UserStore';
import { LayoutExt as AppLayout } from '@m-tools/antd-ext';
import { MobXProviderContext, observer } from 'malganis/mobx-react';
import { useHistory } from 'malganis/router';
import React, { useContext, useEffect } from 'react';

export default observer((props: { children?: React.ReactNode }): JSX.Element => {
  const { children } = props;
  const history = useHistory();

  const { store } = useContext(MobXProviderContext);

  const { UserStore } = store as { UserStore: UserStoreMbx };

  const { userInfo, menu, layoutOpenKeys, layoutSelectedKeys } = UserStore;

  useEffect(() => {
    try {
      if (UserStore) {
        UserStore.getBaseInfo().catch(() => {});
      }
    } catch (ex) {
      console.warn(ex);
    }

    return () => {};
  }, []);

  return (
    <AppLayout
      menu={menu || []}
      history={history}
      openKeys={layoutOpenKeys}
      selectedKeys={layoutSelectedKeys}
      userName={userInfo && userInfo.nickname ? userInfo.nickname : ''}
      onMenuItemClick={async menuItem => {
        if (menuItem.key === 'logout') {
          await UserStore.logout();
        }
      }}
      setOpenKeys={UserStore.setOpenKeys}
      setSelectedKeys={UserStore.setSelectedKeys}
      setTitle={({ collapsed }) => (
        <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 20,
              textAlign: 'center',
              flex: 1,
            }}
          >
            {collapsed ? 'Demo' : 'Demo Application'}
          </div>
        </div>
      )}
    >
      {children}
    </AppLayout>
  );
});
