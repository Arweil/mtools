import { css as reactcss, Global } from '@emotion/react';
import { BaseLayoutExt, Flex } from '@m-tools/antd-ext';
import type { ITab } from '@m-tools/antd-ext/LayoutExt/LayoutHermesExt';
import type { IBaseMenuInfo } from '@m-tools/antd-ext/LayoutV2/types';
import { Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import menuData from './menu.json';

function findNodeByUrl(menuTree: IBaseMenuInfo[], targetUrl: string): IBaseMenuInfo | null {
  for (const item of menuTree) {
    if (item.url === targetUrl) {
      return item; // 直接匹配到目标URL时返回节点
    }

    if (item.children && item.children.length > 0) {
      const foundInChildren = findNodeByUrl(item.children, targetUrl);
      if (foundInChildren !== null) {
        return foundInChildren; // 在子节点中找到目标URL时返回节点
      }
    }
  }

  return null; // 没有找到目标URL时返回null
}

export default function Index() {
  const [layoutOpenKeys, setOpenKeys] = useState<string[]>();
  const [layoutSelectedKeys, setSelectedKeys] = useState<string[]>();
  const [tabs, setTabs] = useState<ITab[]>([]);
  const [tabActive, setTabActive] = useState<string | number>('');
  const [menu, setMenu] = useState<IBaseMenuInfo[]>(menuData as IBaseMenuInfo[]);

  // 递归更新菜单项名称的函数
  const updateMenuNames = useCallback((menuItems: IBaseMenuInfo[]): IBaseMenuInfo[] => {
    return menuItems.map(item => ({
      ...item,
      name: `${item.name}-edit`,
      children: item.children ? updateMenuNames(item.children) : [],
    }));
  }, []);

  // 处理编辑按钮点击事件
  const handleEditMenuNames = useCallback(() => {
    const updatedMenu = updateMenuNames(menu);
    setMenu(updatedMenu);

    // 更新当前 tabs 的 label，根据 code 匹配菜单中的 name
    setTabs(prevTabs =>
      prevTabs.map(tab => {
        const node = findNodeByUrl(updatedMenu, String(tab.code));
        return {
          ...tab,
          label: String(node?.name || tab.label),
        };
      }),
    );
  }, [updateMenuNames, menu]);

  useEffect(() => {
    // setTimeout(() => {
    //   setTabs(['/first-level02/second-level01']);
    //   setTabActive('/first-level02/second-level01');
    //   setSelectedKeys(['/first-level02/second-level01']);
    // }, 2000);
  }, []);

  return (
    <>
      <Global
        styles={reactcss`
            html, body, #root {
              height: 100%;
            }
          `}
      />
      <BaseLayoutExt
        tabs={tabs}
        tabActive={tabActive}
        onTabClick={key => {
          setSelectedKeys([key as string]);
          setTabActive(key as string);
        }}
        onTabRemove={key => {
          const index = tabs.findIndex(item => item.code === key);
          const newTabs = tabs.filter(item => item.code !== key);

          if (tabActive === key) {
            const active = newTabs[index - 1].code;
            setTabActive(active);
            setSelectedKeys([active + '']);
          }

          setTabs(newTabs);
        }}
        needMenuGroup={false}
        setTitle={collapsed => {
          return (
            <Flex
              align="center"
              justify="center"
              style={{ height: '100%', fontSize: 24, color: '#666' }}
            >
              Base
            </Flex>
          );
        }}
        headerExtra={
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              color: '#FFF',
              marginRight: 8,
              gap: 12,
            }}
          >
            <div>超级管理员</div>
          </div>
        }
        menu={menu}
        // 实际使用 history 对象 https://www.npmjs.com/package/history
        history={{
          location: {
            pathname: '/first-level01/second-level01/third-level01',
          },
          listen: () => undefined,
          push: url => {
            window.history.pushState(undefined, '', url);
          },
        }}
        openKeys={layoutOpenKeys}
        selectedKeys={layoutSelectedKeys}
        setOpenKeys={setOpenKeys}
        setSelectedKeys={keys => {
          const key = keys[0];

          const ele = tabs.find(item => item.code === key);
          if (!ele && key) {
            const node = findNodeByUrl(menu, key);
            setTabs([
              ...tabs,
              {
                code: key,
                label: String(node?.name || ''),
              },
            ]);
          }

          setTabActive(key);
          setSelectedKeys(keys);
        }}
      >
        <Button type="primary" size="small" onClick={handleEditMenuNames}>
          编辑菜单
        </Button>
      </BaseLayoutExt>
    </>
  );
}
