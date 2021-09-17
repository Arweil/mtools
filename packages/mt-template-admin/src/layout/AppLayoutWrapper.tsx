import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { UserStore } from '@/stores/UserStore';
import AppLayout, { IBaseMenuInfo } from './AppLayout';
import { SmileOutlined } from '@ant-design/icons';
import { toJS } from 'mobx';

const mapIcon: { [key: string]: React.FunctionComponent } = {
  SmileOutlined: SmileOutlined,
}

export default inject('userStore')(observer(function AppLayoutWrapper(props: {
  userStore?: UserStore;
  children?: React.ReactNode;
}) {
  const { userStore } = props;
  const userInfo = userStore && toJS(userStore.userInfo);
  const menu = userStore && toJS(userStore.menu);

  useEffect(() => {
    (async () => {
      try {
        if (userStore) {
          await Promise.all([
            userStore.setMenu(),
            userStore.getUserInfo(),
          ]);
        }
      } catch (ex) {
        console.warn(ex);
      }

      return () => {}
    })();
  }, []);

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

  menu && test(menu)

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
}));
