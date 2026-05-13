import { UserStore as UserStoreMbx } from '@/stores/UserStore';
import { LayoutExt as AppLayout } from '@m-tools/antd-ext';
import { MobXProviderContext, observer } from 'malganis/mobx-react';
import { useHistory } from 'malganis/router';
import React, { useContext, useEffect } from 'react';

export default observer((props: { children?: React.ReactNode }): React.JSX.Element => {
  const { children } = props;
  const history = useHistory();

  const { store } = useContext(MobXProviderContext);

  const { UserStore } = store as { UserStore: UserStoreMbx };

  const { userInfo, menu } = UserStore;

  useEffect(() => {
    try {
      if (UserStore) {
        UserStore.getBaseInfo().catch(() => {});
      }
    } catch (ex) {
      console.warn(ex);
    }

    return () => {};
  }, [UserStore]);

  return (
    <AppLayout
      menu={menu || []}
      history={history}
      setTitle={({ collapsed }) => (
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            textWrap: 'nowrap',
          }}
        >
          {collapsed ? 'Demo' : 'Demo Application'}
        </div>
      )}
    >
      {children}
    </AppLayout>
  );
});
